import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Actions, Effect, ofType } from "@ngrx/effects";
import { delay, map, mapTo, tap } from "rxjs/operators";
import { AuthenticationActions, LoginViewActions } from "../actions";

@Injectable()
export class LoginViewEffects {
    constructor(
        private actions$: Actions,
        private router: Router
    ) { }

    @Effect()
    public loginSuccessGetInfo$ = this.actions$.pipe(
        ofType(AuthenticationActions.loginSuccess),
        mapTo(AuthenticationActions.getInfo())
    );

    @Effect()
    public loginSuccessDelayed$ = this.actions$.pipe(
        ofType(AuthenticationActions.loginSuccess),
        delay(2000),
        mapTo(LoginViewActions.loginSuccess())
    );

    @Effect({ dispatch: false })
    public loginSuccessRedirectDelayed = this.actions$.pipe(
        ofType(LoginViewActions.loginSuccess),
        delay(500),
        tap(_ => this.router.navigate(["/"]))
    );

    @Effect()
    public loginFailure$ = this.actions$.pipe(
        ofType(AuthenticationActions.loginFailure),
        delay(1000),
        map(({ error }) => {
            if (error.code === "API_UNREACHABLE") {
                return LoginViewActions.loginFailure({ errorMessage: "The service is currently unreachable. Please try again later." });
            } else if (error.code === "BAD_REQUEST") {
                return LoginViewActions.loginFailure({ errorMessage: "You haven't entered username or password. Please enter your credentials to continue." });
            } else if (error.code === "CONFLICT") {
                return LoginViewActions.loginFailure({ errorMessage: "The server has rejected your credentials. Please check your username and password and try again. If the problem persists, please contact system administrator." });
            } else {
                return LoginViewActions.loginFailure({ errorMessage: "An unknown error occurred. Please contact support." });
            }
        })
    );
}
