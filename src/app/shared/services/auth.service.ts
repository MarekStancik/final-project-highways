import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Observable, ObservableInput, throwError } from "rxjs";
import { catchError, map, tap } from "rxjs/operators";
import { environment } from "src/environments/environment";
import { Auth } from "../models/auth.model";
import { UserService } from "./user.service";


export const SESSION_TOKEN = "session-token";
export const SESSION_OBJECT = "session-object";


@Injectable({
    providedIn: "root"
})
export class AuthService {

    public redirectUrl: string;
    constructor(
        private http: HttpClient,
        private user: UserService,
        private router: Router
    ) {
        this.initUserData();
    }

    public login(request: Auth.Request): Observable<Auth.Response> {
        return this.http.post<Auth.Response>(`${environment.apiUrl}/v1/authentication`, request)
        .pipe(
            tap(Response => this.handleLogin(Response)),
            catchError(error => this.handleLoginError(error))
        );
    }

    private initUserData(): void {
        const localToken = localStorage.getItem(SESSION_TOKEN);
        if (localToken) {
            this.user.sessionToken = localToken;
            this.getInfo();
        }
    }

    private handleLogin(response: Auth.Response): void {
        localStorage.setItem(SESSION_TOKEN, response.sessionToken);
        this.user.sessionToken = response.sessionToken;
        this.getInfo();
    }

    private handleLoginError(loginError: any): ObservableInput<any> {
        let err = null;
        switch (loginError.status) {
            case 0:
                err = { errorMessage: "The service is currently unreachable. Please try again later." };
                break;
            case 404:
                err = { errorMessage: "You haven't entered username or password. Please enter your credentials to continue." };
                break;
            case 409:
                err = { errorMessage: "The server has rejected your credentials. Please check your username and password and try again. If the problem persists, please contact system administrator." };
                break;
            default:
                err = { errorMessage: "An unknown error occurred. Please contact support." };
                break;
        }
        return throwError(err);
    }

    private getInfo(): void {
        this.http.get(`${environment.apiUrl}/v1/authentication`)
            .subscribe((res: Auth.Info) => {
                localStorage.setItem(SESSION_OBJECT, JSON.stringify(res));
                this.user.authData$.next(res);
                // this.enums.initEnums();
                if (this.router.url.includes("login")) {
                    setTimeout(() => {
                        this.router.navigateByUrl(this.redirectUrl || "/app");
                        this.redirectUrl = null;
                    });
                }
            }, error => {
                this.user.authData$.next(null);
                localStorage.removeItem(SESSION_TOKEN);
                this.router.navigate(["/", "auth", "login"]);
            });
    }

    public logout(): void {
        this.user.sessionToken = null;
        this.user.authData$.next(null);
        localStorage.removeItem(SESSION_TOKEN);
        localStorage.removeItem(SESSION_OBJECT);
        this.router.navigate(["/", "auth", "login"]);
    }

}
