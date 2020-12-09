import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatInput } from "@angular/material/input";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { MatTableDataSource } from "@angular/material/table";

@Component({
  selector: 'app-user-logs-view',
  templateUrl: './user-logs-view.component.html',
  styleUrls: ['./user-logs-view.component.scss']
})
export class UserLogsViewComponent implements OnInit,AfterViewInit {

  dataSource = new MatTableDataSource<any>();
  displayedColumns = ["startDate","ipAddress","endDate"];
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatInput) filter: MatInput;

  constructor() { }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.filter.stateChanges.subscribe(d => this.dataSource.filter = this.filter.value)
    this.dataSource.sort = this.sort;
  }

  ngOnInit(): void {
    this.dataSource.data = [
      {
        startDate: new Date(),
        ipAddress: "127.0.0.1",
        endDate: new Date(),
      }
    ]
  }  
}
