import { Injectable } from "@angular/core";
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from "@angular/router";
import { Observable } from "rxjs";
import { filter, map, tap } from "rxjs/operators";
import { Auth } from "../models/auth.model";
import { DetailViewMode } from "../models/detail-view-mode";
import { AuthService, SESSION_OBJECT, SESSION_TOKEN } from "../services/auth.service";
import { UserService } from "../services/user.service";

@Injectable({
    providedIn: "root"
})
export class AuthorizationGuard implements CanActivate {

    constructor(private router: Router, private user: UserService) {

    }

    canActivate(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
        return this.user.authData$.pipe(
            filter(d => !!d),
            map(d => d.permissions[route.data.entity as Auth.ResourceType].includes(route.data.detailViewMode === DetailViewMode.Edit ? "update" : "create")),
            tap(ok => {
                if (!ok) {
                    this.router.navigate(["/", "unauthorized"]);
                }
            })
        );
    }
}
