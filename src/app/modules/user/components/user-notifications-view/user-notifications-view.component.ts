import { ChangeDetectionStrategy, Component, OnInit } from "@angular/core";

@Component({
  selector: "app-user-notifications-view",
  templateUrl: "./user-notifications-view.component.html",
  styleUrls: ["./user-notifications-view.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserNotificationsViewComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
