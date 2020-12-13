import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AuthorizationGuard } from "src/app/shared/guards/authorization.guard";
import { SystemViewComponent } from "./system-view/system-view.component";

const routes: Routes = [
  {
    path: "",
    pathMatch: "full",
    redirectTo: "nodes",
  },
  {
    path: "",
    component: SystemViewComponent,
    children: [
      {
        path: "nodes",
        canActivate: [AuthorizationGuard],
        loadChildren: () => import("../nodes/nodes.module").then(m => m.NodesModule),
        data: {
          entity: "node"
        }
      },
      {
        path: "devices",
        canActivate: [AuthorizationGuard],
        loadChildren: () => import("../devices/devices.module").then(m => m.DevicesModule),
        data: {
          entity: "device"
        }
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SystemRoutingModule { }
