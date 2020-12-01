import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { AuthRoutingModule } from "./auth-routing.module";
import { LoginViewComponent } from "./containers/login-view/login-view.component";
import { ReactiveFormsModule } from "@angular/forms";



@NgModule({
  declarations: [LoginViewComponent],
  imports: [
    CommonModule,
    AuthRoutingModule,
    ReactiveFormsModule,
  ],
  providers: [
  ]
})
export class AuthModule { }
