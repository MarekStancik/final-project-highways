import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { LoginViewComponent } from "./containers/login-view/login-view.component";
import { AuthenticationLogoutGuard, AuthenticationRequiredGuard, AuthenticationUndesiredGuard } from "./services";
import { AuthenticationRoutingModule } from "./authentication-routes";
import { StoreModule } from "@ngrx/store";
import { AuthenticationModuleReducers } from "./reducers";



@NgModule({
  declarations: [LoginViewComponent],
  imports: [
    CommonModule,
    AuthenticationRoutingModule,
    StoreModule.forFeature(AuthenticationModuleReducers.featureKey, AuthenticationModuleReducers.reducers),
  ],
  providers: [
    AuthenticationRequiredGuard,
    AuthenticationUndesiredGuard,
    AuthenticationLogoutGuard
  ]
})
export class AuthenticationModule { }
