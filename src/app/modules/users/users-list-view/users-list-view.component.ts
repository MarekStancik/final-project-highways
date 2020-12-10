import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatInput } from "@angular/material/input";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { MatTableDataSource } from "@angular/material/table";
import { UntilDestroy, untilDestroyed } from "@ngneat/until-destroy";
import { filter } from "rxjs/operators";
import { UserModel } from "src/app/shared/models/user.model";
import { UserService } from "src/app/shared/services/user.service";
import { DefaultTable } from "../../components/data/default-table";

@Component({
  selector: 'app-users-list-view',
  templateUrl: './users-list-view.component.html',
  styleUrls: ['./users-list-view.component.scss']
})
export class UsersListViewComponent extends DefaultTable<UserModel,UserService>{
  
  displayedColumns = ["username","lastActivity","enabled"];

  constructor(userService: UserService) { 
    super(userService)
  }
}
