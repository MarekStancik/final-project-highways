import { ChangeDetectionStrategy, Component, OnInit } from "@angular/core";

@Component({
  selector: "app-user-log-detail-view",
  templateUrl: "./user-log-detail-view.component.html",
  styleUrls: ["./user-log-detail-view.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserLogDetailViewComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
