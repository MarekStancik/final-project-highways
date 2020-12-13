import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { AuthorizationGuard } from "src/app/shared/guards/authorization.guard";
import { DetailViewMode } from "src/app/shared/models/detail-view-mode";
import { DeviceDetailViewComponent } from "./device-detail-view/device-detail-view.component";
import { DeviceListViewComponent } from "./device-list-view/device-list-view.component";

const routes: Routes = [
  {
    path: "",
    component: DeviceListViewComponent,
    children: [
      {
        path: "create",
        component: DeviceDetailViewComponent,
        canActivate: [AuthorizationGuard],
        data: {
          entity: "device",
          detailViewMode: DetailViewMode.Create
        }
      },
      {
        path: ":id",
        component: DeviceDetailViewComponent,
      },
      {
        path: ":id/edit",
        component: DeviceDetailViewComponent,
        canActivate: [AuthorizationGuard],
        data: {
          entity: "device",
          detailViewMode: DetailViewMode.Edit
        }
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DevicesRoutingModule { }
