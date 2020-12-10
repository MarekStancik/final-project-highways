import { HttpClient } from "@angular/common/http";
import { AfterViewInit, Component, Injectable, OnInit, ViewChild } from '@angular/core';
import { MatInput } from "@angular/material/input";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { MatTableDataSource } from "@angular/material/table";
import { DefaultTable } from "src/app/modules/components/data/default-table";
import { UserActivityModel } from "src/app/shared/models/user.model";
import { AuthService } from "src/app/shared/services/auth.service";
import { ObjectService } from "src/app/shared/services/object.service";
import { WsClient } from "src/app/shared/services/ws-api/ws-client";

@Component({
  selector: 'app-user-logs-view',
  templateUrl: './user-logs-view.component.html',
  styleUrls: ['./user-logs-view.component.scss']
})
export class UserLogsViewComponent extends DefaultTable<UserActivityModel,UserActivityService> {

  displayedColumns = ["date","ipAddress"];

  constructor(as: UserActivityService) { 
    super(as)
  }
}

@Injectable({
  providedIn: "root"
})
export class UserActivityService extends ObjectService<UserActivityModel> {

  constructor(http: HttpClient, wsClient: WsClient) {
    super(http,wsClient,"user","activity")
  }

}
