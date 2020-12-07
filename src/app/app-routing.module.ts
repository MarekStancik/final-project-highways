import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { AuthGuard } from "./shared/guards/auth.guard";

const routes: Routes = [
  {
    path: "",
    pathMatch: "full",
    redirectTo: "auth"
  },
  {
    path: "auth",
    loadChildren: () => import("./modules/auth/auth.module").then(module => module.AuthModule)
  },
  {
    path: "app",
    canActivate: [AuthGuard],
    loadChildren: () => import("./modules/root/root.module").then(module => module.RootModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
