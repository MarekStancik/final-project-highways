import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AuthorizationGuard } from "src/app/shared/guards/authorization.guard";
import { DetailViewMode } from "src/app/shared/models/detail-view-mode";
import { UserDetailViewComponent } from "./user-detail-view/user-detail-view.component";
import { UsersListViewComponent } from "./users-list-view/users-list-view.component";

const routes: Routes = [
  {
    path: "",
    component: UsersListViewComponent,
    children: [
      {
        path: "create",
        component: UserDetailViewComponent,
        canActivate: [AuthorizationGuard],
        data: {
          entity: "user",
          detailViewMode: DetailViewMode.Create
        }
      },
      {
        path: ":id",
        component: UserDetailViewComponent,
      },
      {
        path: ":id/edit",
        component: UserDetailViewComponent,
        canActivate: [AuthorizationGuard],
        data: {
          entity: "user",
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
export class UsersRoutingModule { }
