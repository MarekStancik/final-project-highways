import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { MatTabsModule } from "@angular/material/tabs";
import { SharedModule } from "src/app/shared/shared.module";
import { DataModule } from "../components/data/data.module";
import { UserInfoViewComponent } from "./components/user-info-view/user-info-view.component";
import { UserLogDetailViewComponent } from "./components/user-log-detail-view/user-log-detail-view.component";
import { UserLogsViewComponent } from "./components/user-logs-view/user-logs-view.component";
import { UserNotificationsViewComponent } from "./components/user-notifications-view/user-notifications-view.component";
import { UserRoutingModule } from "./user-routing.module";
import { UserViewComponent } from "./user-view/user-view.component";



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
