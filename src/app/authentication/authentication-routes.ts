import { ModuleWithProviders } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { LoginViewComponent } from "./containers/login-view/login-view.component";
import { AuthenticationLogoutGuard, AuthenticationUndesiredGuard } from "./services";

export const routes: Routes = [
    {
        path: "login",
        component: LoginViewComponent,
        canActivate: [AuthenticationUndesiredGuard]
    },
    {
        path: "logout",
        canActivate: [AuthenticationLogoutGuard],
        component: LoginViewComponent
    }
];

export const AuthenticationRoutingModule: ModuleWithProviders<RouterModule> = RouterModule.forChild(routes);

