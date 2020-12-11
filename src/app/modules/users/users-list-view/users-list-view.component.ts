import { ChangeDetectionStrategy, Component } from "@angular/core";
import { UserModel } from "src/app/shared/models/user.model";
import { UserService } from "src/app/shared/services/user.service";
import { DefaultTable } from "../../components/data/default-table";

@Component({
  selector: "app-users-list-view",
  templateUrl: "./users-list-view.component.html",
  styleUrls: ["./users-list-view.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UsersListViewComponent extends DefaultTable<UserModel>{

  displayedColumns = ["username", "lastActivity", "enabled"];

  constructor(userService: UserService) {
    super(userService);
  }
}
