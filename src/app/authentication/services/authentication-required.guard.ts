import { Injectable } from "@angular/core";
import { CanActivate, Router } from "@angular/router";
import { Store } from "@ngrx/store";
import { Observable, of } from "rxjs";
import { filter, switchMap, take, tap } from "rxjs/operators";
import { AuthenticationModuleReducers } from "../reducers";
import { selectAuthenticationState } from "../selectors";

@Injectable()
export class AuthenticationRequiredGuard implements CanActivate {

    constructor(private store$: Store<AuthenticationModuleReducers.AppState>, private router: Router) { }

    public canActivate(): Observable<boolean> {
        return this.store$.select(selectAuthenticationState).pipe(
            filter(state => state.initialized),
            switchMap(state => {
                return state.authInfo ? of(true) : of(false).pipe(tap(_ => this.router.navigate(["/", "authentication", "login"])));
            }),
            take(1)
        );
    }
}
