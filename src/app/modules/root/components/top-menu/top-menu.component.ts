import { ChangeDetectionStrategy, Component } from "@angular/core";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { pascalCase } from "pascal-case";
import { AuthService } from "src/app/shared/services/auth.service";
import { UiStateService } from "src/app/shared/services/ui-state.service";

@Component({
  selector: "app-top-menu",
  templateUrl: "./top-menu.component.html",
  styleUrls: ["./top-menu.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TopMenuComponent {

  faUser = faUser;

  constructor(public uiState: UiStateService, public auth: AuthService) { }

  pascal(val: string): string {
    return val ? pascalCase(val) : "-";
  }
}
