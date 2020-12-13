import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { DevicesRoutingModule } from "./devices-routing.module";
import { DeviceListViewComponent } from "./device-list-view/device-list-view.component";
import { DeviceDetailViewComponent } from "./device-detail-view/device-detail-view.component";
import { SharedModule } from "src/app/shared/shared.module";
import { DataModule } from "../components/data/data.module";


@NgModule({
  declarations: [DeviceListViewComponent, DeviceDetailViewComponent],
  imports: [
    CommonModule,
    DevicesRoutingModule,
    SharedModule,
    DataModule
  ]
})
export class DevicesModule { }
