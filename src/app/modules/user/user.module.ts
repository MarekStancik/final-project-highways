import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import { UserViewComponent } from './user-view/user-view.component';
import { MatTabsModule } from "@angular/material/tabs";
import { SharedModule } from "src/app/shared/shared.module";
import { UserLogsViewComponent } from './components/user-logs-view/user-logs-view.component';
import { UserInfoViewComponent } from './components/user-info-view/user-info-view.component';
import { UserNotificationsViewComponent } from './components/user-notifications-view/user-notifications-view.component';
import { DataModule } from "../components/data/data.module";
import { UserLogDetailViewComponent } from './components/user-log-detail-view/user-log-detail-view.component';


@NgModule({
  declarations: [UserViewComponent, UserLogsViewComponent, UserInfoViewComponent, UserNotificationsViewComponent, UserLogDetailViewComponent],
  imports: [
    CommonModule,
    UserRoutingModule,
    MatTabsModule,
    DataModule,
    SharedModule
  ]
})
export class UserModule { }
