import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AuthorizationGuard } from "src/app/shared/guards/authorization.guard";
import { RootViewComponent } from "./root-view/root-view.component";

const routes: Routes = [
  {
    path: "",
    component: RootViewComponent,
    children: [
      {
        path: "",
        redirectTo: "routes",
        pathMatch: "full"
      },
      {
        path: "routes",
        canActivate: [AuthorizationGuard],
        loadChildren: () => import("../routes/routes.module").then(m => m.RoutesModule),
        data: {
          entity: "route"
        }
      },
      {
        path: "users",
        canActivate: [AuthorizationGuard],
        loadChildren: () => import("../users/users.module").then(m => m.UsersModule),
        data: {
          entity: "user"
        }
      },
      {
        path: "system",
        loadChildren: () => import("../system/system.module").then(m => m.SystemModule)
      },
      {
        path: "user",
        loadChildren: () => import("../user/user.module").then(m => m.UserModule)
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RootRoutingModule { }
