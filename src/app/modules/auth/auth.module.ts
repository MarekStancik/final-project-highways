import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { AuthRoutingModule } from "./auth-routing.module";
import { LoginViewComponent } from "./containers/login-view/login-view.component";
import { SharedModule } from "src/app/shared/shared.module";



@NgModule({
  declarations: [LoginViewComponent],
  imports: [
    CommonModule,
    AuthRoutingModule,
    SharedModule,
  ],
  providers: [
  ]
})
export class AuthModule { }
