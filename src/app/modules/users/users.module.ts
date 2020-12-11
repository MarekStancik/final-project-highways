import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsersRoutingModule } from './users-routing.module';
import { UsersListViewComponent } from './users-list-view/users-list-view.component';
import { DataModule } from "../components/data/data.module";
import { SharedModule } from "src/app/shared/shared.module";
import { UserDetailViewComponent } from './user-detail-view/user-detail-view.component';


@NgModule({
  declarations: [UsersListViewComponent, UserDetailViewComponent],
  imports: [
    CommonModule,
    DataModule,
    UsersRoutingModule,
    SharedModule
  ]
})
export class UsersModule { }
