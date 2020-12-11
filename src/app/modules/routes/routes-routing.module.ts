import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AuthorizationGuard } from "src/app/shared/guards/authorization.guard";
import { DetailViewMode } from "src/app/shared/models/detail-view-mode";
import { RoutesDetailViewComponent } from "./routes-detail-view/routes-detail-view.component";
import { RoutesListViewComponent } from "./routes-list-view/routes-list-view.component";

const routes: Routes = [
  {
    path: "",
    component: RoutesListViewComponent,
    children: [
      {
        path: "create",
        component: RoutesDetailViewComponent,
        canActivate: [AuthorizationGuard],
        data: {
          entity: "route",
          detailViewMode: DetailViewMode.Create
        }
      },
      {
        path: ":id",
        component: RoutesDetailViewComponent,
      },
      {
        path: ":id/edit",
        component: RoutesDetailViewComponent,
        canActivate: [AuthorizationGuard],
        data: {
          entity: "route",
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
export class RoutesRoutingModule { }
