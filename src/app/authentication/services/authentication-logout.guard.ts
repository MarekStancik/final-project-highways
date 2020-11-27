import { Injectable } from "@angular/core";
import { CanActivate, Router } from "@angular/router";
import { Store } from "@ngrx/store";
import { Observable } from "rxjs";
import { filter, mapTo, take, tap } from "rxjs/operators";
import { AuthenticationActions } from "../actions";
import { AuthenticationModuleReducers } from "../reducers";
import { selectAuthenticationTokenInfo } from "../selectors";

@Injectable()
export class AuthenticationLogoutGuard implements CanActivate {
    constructor(private store$: Store<AuthenticationModuleReducers.AppState>, private router: Router) { }

    public canActivate(): Observable<boolean> {
        this.store$.dispatch(AuthenticationActions.logout());
        return this.store$.select(selectAuthenticationTokenInfo).pipe(
            filter(tokenInfo => !tokenInfo),
            tap(_ => this.router.navigate(["/", "authentication", "login"])),
            mapTo(false),
            take(1)
        );
    }
}
