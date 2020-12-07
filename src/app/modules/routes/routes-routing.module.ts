import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
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
        data: {
          detailViewMode: DetailViewMode.Create
        }
      },
      {
        path: ":id",
        component: RoutesDetailViewComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RoutesRoutingModule { }
