import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { SystemViewComponent } from "./system-view/system-view.component";

const routes: Routes = [
  {
    path: "",
    component: SystemViewComponent,
    children: [
      {
        path: "nodes",
        loadChildren: () => import("../nodes/nodes.module").then(m => m.NodesModule)
      },
      {
        path: "devices",
        loadChildren: () => import("../devices/devices.module").then(m => m.DevicesModule)
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SystemRoutingModule { }
