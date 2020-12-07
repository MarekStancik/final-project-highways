import { Component, OnInit } from "@angular/core";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { AuthService } from "src/app/shared/services/auth.service";
import { UiStateService } from "src/app/shared/services/ui-state.service";

@Component({
  selector: "app-top-menu",
  templateUrl: "./top-menu.component.html",
  styleUrls: ["./top-menu.component.scss"]
})
export class TopMenuComponent implements OnInit {

  faUser = faUser;

  constructor(public uiState: UiStateService, public auth: AuthService) { }

  ngOnInit(): void {
  }

}
