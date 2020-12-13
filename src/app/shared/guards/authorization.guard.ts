import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { Observable } from "rxjs";
import { filter, map, tap } from "rxjs/operators";
import { Auth } from "../models/auth.model";
import { DetailViewMode } from "../models/detail-view-mode";
import { AuthService } from "../services/auth.service";

@Injectable({
    providedIn: "root"
})
export class AuthorizationGuard implements CanActivate {

    constructor(private router: Router, private auth: AuthService) {

    }

    canActivate(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
        const mode = route.data.detailViewMode;
        const operation: Auth.OperationType = mode ? mode === DetailViewMode.Edit ? "update" : "create" : "read";
        return this.auth.authData$.pipe(
            filter(d => !!d),
            map(d => d.permissions[route.data.entity as Auth.ResourceType].includes(operation)),
            tap(ok => {
                if (!ok) {
                    this.router.navigate(["/", "unauthorized"]);
                }
            })
        );
    }
}
