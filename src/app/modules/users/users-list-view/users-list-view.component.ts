import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatInput } from "@angular/material/input";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { MatTableDataSource } from "@angular/material/table";

@Component({
  selector: 'app-users-list-view',
  templateUrl: './users-list-view.component.html',
  styleUrls: ['./users-list-view.component.scss']
})
export class UsersListViewComponent implements AfterViewInit{
  
  dataSource = new MatTableDataSource<any>();
  displayedColumns = ["username","lastActivity","enabled"];
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatInput) filter: MatInput;

  constructor() { }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.filter.stateChanges.subscribe(_ => this.dataSource.filter = this.filter.value);
  }


}
