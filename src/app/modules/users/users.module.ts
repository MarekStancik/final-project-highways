import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { MatSelectModule } from "@angular/material/select";
import { SharedModule } from "src/app/shared/shared.module";
import { DataModule } from "../components/data/data.module";
import { UserDetailViewComponent } from "./user-detail-view/user-detail-view.component";
import { UsersListViewComponent } from "./users-list-view/users-list-view.component";
import { UsersRoutingModule } from "./users-routing.module";



@NgModule({
  declarations: [UsersListViewComponent, UserDetailViewComponent],
  imports: [
    CommonModule,
    DataModule,
    UsersRoutingModule,
    MatSelectModule,
    SharedModule
  ]
})
export class UsersModule { }
