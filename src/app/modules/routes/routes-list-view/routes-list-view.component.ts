import { AfterViewInit, ChangeDetectionStrategy, Component, OnInit, ViewChild } from "@angular/core";
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

  private _detailOpened = false;
  public get detailOpened(): boolean {
    return this._detailOpened;
  }
  public set detailOpened(val: boolean) {
    this._detailOpened = val;
  }

  public displayedColumns: string[] = ["route", "name", "length", "avgTime", "status"];
  public dataSource: MatTableDataSource<Route>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private routeService: RouteService) {
    this.dataSource = new MatTableDataSource([]);
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.dataSource.sortingDataAccessor = (item, prop) => {
      if (prop === "route") {
        return item.from;
      }
      return (item as any)[prop];
    };
    this.routeService.list$.pipe(
      filter(data => !!data),
      untilDestroyed(this),
    ).subscribe(routes => this.dataSource.data = routes);
  }

  public applyFilter(event: any): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
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
