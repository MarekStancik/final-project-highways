import { Injectable } from "@angular/core";
import { Actions, Effect, ofType } from "@ngrx/effects";
import { Store } from "@ngrx/store";
import { iif, of } from "rxjs";
import { catchError, delay, filter, mapTo, switchMap, tap, withLatestFrom } from "rxjs/operators";
import { selectAuthenticationInfo, selectAuthenticationInitialized, selectAuthenticationTokenInfo } from "../selectors";
import { AuthenticationActions } from "../actions";
import { ResponseDto } from "../models";
import { AuthenticationModuleReducers } from "../reducers";
import { InfoDto } from "../models/info-dto";
import { ApiService } from "src/app/api/services/api.service";

@Injectable()
export class AuthenticationEffects {
    constructor(private actions$: Actions, private store$: Store<AuthenticationModuleReducers.AppState>, private api: ApiService) { }

    @Effect()
    public initialize$ = this.actions$.pipe(
        ofType(AuthenticationActions.initialize),
        tap(_ => this.api.sessionToken = localStorage.getItem("sessionToken") || null),
        switchMap(_ =>
            iif(() => !!this.api.sessionToken,
                of(AuthenticationActions.getInfo()),
                of(AuthenticationActions.initializeSuccess({}))
            )
        )
    );

    @Effect()
    public initializeWithSession$ = this.actions$.pipe(
        ofType(AuthenticationActions.getInfoSuccess),
        withLatestFrom(this.store$.select(selectAuthenticationInitialized)),
        filter(([_, initialized]) => !initialized),
        switchMap(() => of(AuthenticationActions.initializeSuccess({ sessionToken: this.api.sessionToken })))
    );

    @Effect()
    public initializeWithoutSession$ = this.actions$.pipe(
        ofType(AuthenticationActions.getInfoFailure),
        withLatestFrom(this.store$.select(selectAuthenticationInitialized)),
        filter(([_, initialized]) => !initialized),
        tap(_ => localStorage.removeItem("sessionToken")),
        mapTo(AuthenticationActions.initializeSuccess({}))
    );

    @Effect()
    public login$ = this.actions$.pipe(
        ofType(AuthenticationActions.login),
        delay(1000),
        switchMap(({ request }) =>
            this.api
                .postWithoutAuthentication<ResponseDto>("/authentication", request)
                .pipe(
                    tap(response => this.api.sessionToken = response.sessionToken),
                    tap(_ => localStorage.setItem("sessionToken", this.api.sessionToken)),
                    switchMap(response => of(AuthenticationActions.loginSuccess({ response }))),
                    catchError(error => of(AuthenticationActions.loginFailure({ error: error.serialize() })))
                )
        )
    );

    @Effect()
    public logout$ = this.actions$.pipe(
        ofType(AuthenticationActions.logout),
        withLatestFrom(this.store$.select(selectAuthenticationTokenInfo)),
        switchMap(([_, tokenInfo]) =>
            iif(() => !tokenInfo,
                of(AuthenticationActions.logoutSuccess()),
                this.api
                    .delete("/authentication")
                    .pipe(
                        switchMap(() => of(AuthenticationActions.logoutSuccess())),
                        catchError(() => of(AuthenticationActions.logoutSuccess()))
                    )
            )
        ),
        tap(_ => this.api.sessionToken = null),
        tap(_ => localStorage.removeItem("sessionToken"))
    );

    @Effect()
    public getInfo$ = this.actions$.pipe(
        ofType(AuthenticationActions.getInfo),
        withLatestFrom(this.store$.select(selectAuthenticationInfo)),
        switchMap(([_, authInfo]) =>
            iif(() => !!authInfo,
                of(AuthenticationActions.getInfoSuccess({ response: authInfo })),
                this.api
                    .get<InfoDto>("/authentication")
                    .pipe(
                        switchMap(response => of(AuthenticationActions.getInfoSuccess({ response }))),
                        catchError(error => of(AuthenticationActions.getInfoFailure({ error: error.serialize() })))
                    )

            )
        )
    );
}
