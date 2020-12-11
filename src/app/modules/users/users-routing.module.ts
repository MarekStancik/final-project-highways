import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { UserDetailViewComponent } from "./user-detail-view/user-detail-view.component";
import { UsersListViewComponent } from "./users-list-view/users-list-view.component";

const routes: Routes = [
  {
    path: "",
    component: UsersListViewComponent,
    children: [
      {
        path: ":id",
        component: UserDetailViewComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsersRoutingModule { }
