import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, throwError } from "rxjs";
import { catchError } from "rxjs/operators";
import { Router } from "@angular/router";
import { SESSION_TOKEN } from "../shared/services/auth.service";

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  constructor(private router: Router) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const currentUserToken = localStorage.getItem(SESSION_TOKEN);
    if (currentUserToken) {
      req = req.clone({
        setHeaders: {
          "X-Session-Token": currentUserToken
        }
      });
    }
    return next.handle(req).pipe(catchError(err => {
      if (err.status >= 400 && (err.status !== 401)) {
        return throwError(err);
      }

      if (err.status === 401) {
        this.router.navigateByUrl("/auth/login");
      }

      return throwError(err);
    }));
  }
}
