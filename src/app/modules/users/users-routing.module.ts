import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { UsersListViewComponent } from "./users-list-view/users-list-view.component";

const routes: Routes = [
  {
    path: "",
    component: UsersListViewComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsersRoutingModule { }
