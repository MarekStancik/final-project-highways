import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserInfoViewComponent } from "./components/user-info-view/user-info-view.component";
import { UserLogDetailViewComponent } from "./components/user-log-detail-view/user-log-detail-view.component";
import { UserLogsViewComponent } from "./components/user-logs-view/user-logs-view.component";
import { UserNotificationsViewComponent } from "./components/user-notifications-view/user-notifications-view.component";
import { UserViewComponent } from "./user-view/user-view.component";

const routes: Routes = [
  {
    path: "",
    component: UserViewComponent,
    children: [
      {
        path: "info",
        component: UserInfoViewComponent
      },
      {
        path: "logs",
        component: UserLogsViewComponent,
        children: [
          {
            path: ":id",
            component: UserLogDetailViewComponent
          }
        ]
      },
      {
        path: "notifications",
        component: UserNotificationsViewComponent
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
