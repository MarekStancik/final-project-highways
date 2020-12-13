import { ChangeDetectionStrategy, Component } from "@angular/core";
import { UserModel } from "src/app/shared/models/user.model";
import { UserService } from "src/app/shared/services/user.service";
import { DefaultTableDirective } from "../../components/data/default-table";

@Component({
  selector: "app-users-list-view",
  templateUrl: "./users-list-view.component.html",
  styleUrls: ["./users-list-view.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UsersListViewComponent extends DefaultTableDirective<UserModel>{

  displayedColumns = ["username", "lastActivity", "email", "role", "enabled"];

  constructor(userService: UserService) {
    super(userService);
  }
}
