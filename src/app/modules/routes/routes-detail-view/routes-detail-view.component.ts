import { ChangeDetectionStrategy, Component, OnInit } from "@angular/core";
import { FormControl, FormGroup } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { faArrowLeft, faBacon, faPencilAlt, faTimes, faTrash } from "@fortawesome/free-solid-svg-icons";
import { UntilDestroy, untilDestroyed } from "@ngneat/until-destroy";
import { BehaviorSubject, combineLatest, Observable } from "rxjs";
import { filter, map, startWith, take, tap } from "rxjs/operators";
import { DetailViewMode } from "src/app/shared/models/detail-view-mode";
import { Route } from "src/app/shared/models/route.model";
import { AuthService } from "src/app/shared/services/auth.service";
import { RouteService } from "src/app/shared/services/route.service";
import { UserService } from "src/app/shared/services/user.service";

@UntilDestroy()
@Component({
  templateUrl: "./routes-detail-view.component.html",
  styleUrls: ["./routes-detail-view.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RoutesDetailViewComponent implements OnInit {

  public canDelete$: Observable<boolean>;
  public canEdit$: Observable<boolean>;
  public isSubmitting$ = new BehaviorSubject(false);
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
  public object$ = new BehaviorSubject<Route>(null);

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private routeService: RouteService,
    private auth: AuthService
  ) { }

  ngOnInit(): void {
    this.filteredOptions$ = this.group.get("start").valueChanges.pipe(
      startWith(""),
      map(value => this._filter(value))
    );

    this.mode$ = this.route.data.pipe(map(data => data.detailViewMode || DetailViewMode.View));
    this.canDelete$ = this.auth.authData$.pipe(filter(data => !!data), map(data => data.permissions.route.includes("delete")));
    this.canEdit$ = this.auth.authData$.pipe(filter(data => !!data), map(data => data.permissions.route.includes("update")));

    this.route.params
      .pipe(
        untilDestroyed(this),
        filter(params => !!params.id),
        map(params => params.id),
        tap(id => {
          this.routeService.get(id)
            .pipe(
              untilDestroyed(this),
              filter(d => !!d),
              tap(data => this.title$.next(`Route ${data.name}`)),
              tap(data => this.object$.next(data))
            ).subscribe();
        })
      )
      .subscribe();

    combineLatest([this.mode$, this.object$]).pipe(
      untilDestroyed(this),
      filter(([mode, object]) => !!mode && !!object && mode === DetailViewMode.Edit),
      take(1),
      tap(([_, object]) => this.group.patchValue(object))
    ).subscribe();
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.options.filter(option => option.toLowerCase().indexOf(filterValue) === 0);
  }

  public async submit(): Promise<void> {
    this.mode$.pipe(
      untilDestroyed(this),
      take(1),
      tap((mode) => {
        this.isSubmitting$.next(true);
        let sub: Observable<Route> = null;
        if (mode === DetailViewMode.Create) {
          sub = this.routeService.create(this.group.value);
        } else if (mode === DetailViewMode.Edit) {
          sub = this.routeService.update(Object.assign({ _id: this.object$.value._id }, this.group.value));
        }
        sub.pipe(take(1)).subscribe({
          next: () => {
            this.isSubmitting$.next(false);
            this.router.navigate(["../"], { relativeTo: this.route });
          },
          error: err => {
            this.isSubmitting$.next(false);
            alert(err.message);
          }
        });
      })
    ).subscribe();
  }

  public async delete(): Promise<void> {
    try {
      if (confirm(`Confirm Deletion of route '${this.object$.value.name}'`)) {
        await this.routeService.delete(this.object$.value).toPromise();
        this.router.navigate(["../"], { relativeTo: this.route });
      }
    } catch (err) {
      alert(err.message);
    }
  }
}
