import { AfterViewInit, Directive, ViewChild } from "@angular/core";
import { MatInput } from "@angular/material/input";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { MatTableDataSource } from "@angular/material/table";
import { UntilDestroy, untilDestroyed } from "@ngneat/until-destroy";
import { filter } from "rxjs/operators";
import { DatabaseObject } from "src/app/shared/models/db-object.model";
import { ObjectService } from "src/app/shared/services/object.service";

@UntilDestroy()
@Directive()
export abstract class DefaultTable<T extends DatabaseObject> implements AfterViewInit {

  public dataSource: MatTableDataSource<T>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatInput) filter: MatInput;

  constructor(private service: ObjectService<T>) {
    this.dataSource = new MatTableDataSource([]);
    this.service.getAll();
    this.service.list$.pipe(
      untilDestroyed(this),
      filter(data => !!data),
    ).subscribe(data => this.dataSource.data = data);
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.filter.stateChanges.subscribe(_ => this.dataSource.filter = this.filter.value);
  }

}
