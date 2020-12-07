import { ChangeDetectionStrategy, Component, OnInit } from "@angular/core";
import { FormControl, FormGroup } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { faArrowLeft, faBacon, faPencilAlt, faTimes, faTrash } from "@fortawesome/free-solid-svg-icons";
import { UntilDestroy, untilDestroyed } from "@ngneat/until-destroy";
import { BehaviorSubject, Observable } from "rxjs";
import { filter, map, startWith, take, tap } from "rxjs/operators";
import { DetailViewMode } from "src/app/shared/models/detail-view-mode";
import { RouteService } from "src/app/shared/services/route.service";

@UntilDestroy()
@Component({
  templateUrl: "./routes-detail-view.component.html",
  styleUrls: ["./routes-detail-view.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RoutesDetailViewComponent implements OnInit {

  public canDelete = false;
  public canEdit = false;
  public isSubmitting = false;
  public mode$: Observable<DetailViewMode>;
  public createTitle = "Create Route";
  public title$ = new BehaviorSubject("Route");
  public icon = faBacon;
  public faTrash = faTrash;
  public faPencil = faPencilAlt;
  public faArrow = faArrowLeft;
  public faTimes = faTimes;

  public group = new FormGroup({
    start: new FormControl(""),
    end: new FormControl(""),
    name: new FormControl(""),
    length: new FormControl(0)
  });
  public options: string[] = ["One", "Two", "Three"];
  public filteredOptions$: Observable<string[]>;
  public object$ = new BehaviorSubject(null);

  constructor(private route: ActivatedRoute, private routeService: RouteService) { }

  ngOnInit(): void {
    this.filteredOptions$ = this.group.get("start").valueChanges.pipe(
      startWith(""),
      map(value => this._filter(value))
    );

    this.mode$ = this.route.data.pipe(map(data => data.detailViewMode || DetailViewMode.View));

    this.route.params
      .pipe(
        untilDestroyed(this),
        filter(params => !!params.id),
        map(params => params.id),
        tap(id => {
          this.routeService.get(id)
            .pipe(
              untilDestroyed(this),
              tap(data => this.title$.next(`Route ${data.name}`)),
              tap(data => this.object$.next(data))
            ).subscribe();
        })
      )
      .subscribe();
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.options.filter(option => option.toLowerCase().indexOf(filterValue) === 0);
  }


}
