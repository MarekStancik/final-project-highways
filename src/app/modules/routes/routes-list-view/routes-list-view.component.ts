import { AfterViewInit, ChangeDetectionStrategy, Component, OnInit, ViewChild } from "@angular/core";
import { MatInput } from "@angular/material/input";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { MatTableDataSource } from "@angular/material/table";
import { UntilDestroy } from "@ngneat/until-destroy";
import { untilDestroyed } from "@ngneat/until-destroy";
import { filter, tap } from "rxjs/operators";
import { RouteService } from "src/app/shared/services/route.service";
import { Route, RouteStatus } from "../../../shared/models/route.model";

@UntilDestroy()
@Component({
  templateUrl: "./routes-list-view.component.html",
  styleUrls: ["./routes-list-view.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RoutesListViewComponent implements AfterViewInit {

  public displayedColumns: string[] = ["route", "name", "length", "avgTime", "status"];
  public dataSource: MatTableDataSource<Route>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatInput) filter: MatInput;

  constructor(private routeService: RouteService) {
    this.dataSource = new MatTableDataSource([]);
    this.routeService.getAll();
    this.routeService.list$.pipe(
      untilDestroyed(this),
      filter(data => !!data),
    ).subscribe(routes => this.dataSource.data = routes);
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.filter.stateChanges.subscribe(_ => this.dataSource.filter = this.filter.value);
    this.dataSource.sortingDataAccessor = (item, prop) => {
      if (prop === "route") {
        return item.start;
      }
      return (item as any)[prop];
    };
  }

  public getColorForStatus(status: RouteStatus): string {
    switch (status) {
      case "empty":
        return "#4CAF50";
      case "normal":
        return "#2196F3";
      case "full":
        return "#FF7043";
      case "jammed":
        return "#E53935";
    }
  }
}
