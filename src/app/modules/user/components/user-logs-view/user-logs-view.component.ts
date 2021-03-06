import { HttpClient } from "@angular/common/http";
import { ChangeDetectionStrategy, Component, Injectable } from "@angular/core";
import { DefaultTableDirective } from "src/app/modules/components/data/default-table";
import { UserActivityModel } from "src/app/shared/models/user.model";
import { ObjectService } from "src/app/shared/services/object.service";
import { WsClient } from "src/app/shared/services/ws-api/ws-client";

@Component({
  selector: "app-user-logs-view",
  templateUrl: "./user-logs-view.component.html",
  styleUrls: ["./user-logs-view.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserLogsViewComponent extends DefaultTableDirective<UserActivityModel> {

  displayedColumns = ["date", "ipAddress"];

  constructor(as: UserActivityService) {
    super(as);
  }
}

@Injectable({
  providedIn: "root"
})
export class UserActivityService extends ObjectService<UserActivityModel> {

  constructor(http: HttpClient, wsClient: WsClient) {
    super(http, wsClient, "user", "activity");
  }

}
