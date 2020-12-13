import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { AuthorizationGuard } from "src/app/shared/guards/authorization.guard";
import { DetailViewMode } from "src/app/shared/models/detail-view-mode";
import { NodeDetailViewComponent } from "./node-detail-view/node-detail-view.component";
import { NodeListViewComponent } from "./node-list-view/node-list-view.component";

const routes: Routes = [
  {
    path: "",
    component: NodeListViewComponent,
    children: [
      {
        path: "create",
        component: NodeDetailViewComponent,
        canActivate: [AuthorizationGuard],
        data: {
          entity: "node",
          detailViewMode: DetailViewMode.Create
        }
      },
      {
        path: ":id",
        component: NodeDetailViewComponent,
      },
      {
        path: ":id/edit",
        component: NodeDetailViewComponent,
        canActivate: [AuthorizationGuard],
        data: {
          entity: "node",
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
export class NodesRoutingModule { }
