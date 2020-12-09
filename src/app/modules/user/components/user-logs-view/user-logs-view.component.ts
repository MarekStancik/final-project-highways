import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from "@angular/material/table";

@Component({
  selector: 'app-user-logs-view',
  templateUrl: './user-logs-view.component.html',
  styleUrls: ['./user-logs-view.component.scss']
})
export class UserLogsViewComponent implements OnInit {

  dataSource = new MatTableDataSource<any>();
  displayedColumns = ["startDate","ipAddress","endDate"];

  constructor() { }

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
