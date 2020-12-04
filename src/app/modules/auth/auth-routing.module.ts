import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { LoginViewComponent } from "./containers/login-view/login-view.component";

const routes: Routes = [
    {
        path: "",
        pathMatch: "full",
        redirectTo: "login"
    },
    {
        path: "login",
        component: LoginViewComponent
    }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
