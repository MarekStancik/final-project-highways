import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsersRoutingModule } from './users-routing.module';
import { UsersListViewComponent } from './users-list-view/users-list-view.component';
import { DataModule } from "../components/data/data.module";
import { SharedModule } from "src/app/shared/shared.module";


@NgModule({
  declarations: [UsersListViewComponent],
  imports: [
    CommonModule,
    DataModule,
    UsersRoutingModule,
    SharedModule
  ]
})
export class UsersModule { }
