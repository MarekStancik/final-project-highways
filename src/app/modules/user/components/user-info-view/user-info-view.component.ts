import { ChangeDetectionStrategy, Component, OnInit } from "@angular/core";

@Component({
  selector: "app-user-info-view",
  templateUrl: "./user-info-view.component.html",
  styleUrls: ["./user-info-view.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserInfoViewComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
