import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { DeviceListViewComponent } from "./device-list-view/device-list-view.component";

const routes: Routes = [
  {
    path: "",
    component: DeviceListViewComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DevicesRoutingModule { }
