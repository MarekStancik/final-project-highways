import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { AuthRoutingModule } from "./auth-routing.module";
import { LoginViewComponent } from "./containers/login-view/login-view.component";
import { ReactiveFormsModule } from "@angular/forms";
import { SharedModule } from "src/app/shared/shared.module";
import { MatInputModule } from "@angular/material/input";



@NgModule({
  declarations: [LoginViewComponent],
  imports: [
    CommonModule,
    AuthRoutingModule,
    ReactiveFormsModule,
    SharedModule,
    MatInputModule,
  ],
  providers: [
  ]
})
export class AuthModule { }
