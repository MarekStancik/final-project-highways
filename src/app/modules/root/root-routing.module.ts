import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
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
        loadChildren: () => import("../routes/routes.module").then(m => m.RoutesModule)
      },
      {
        path: "users",
        loadChildren: () => import("../users/users.module").then(m => m.UsersModule)
      },
      {
        path: "system",
        loadChildren: () => import("../system/system.module").then(m => m.SystemModule)
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RootRoutingModule { }
