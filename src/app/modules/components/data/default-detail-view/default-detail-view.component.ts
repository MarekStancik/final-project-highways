import { ChangeDetectionStrategy, Component, Input, OnInit } from "@angular/core";
import { FormGroup } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { IconDefinition } from "@fortawesome/free-solid-svg-icons";
import { UntilDestroy, untilDestroyed } from "@ngneat/until-destroy";
import { pascalCase } from "pascal-case";
import { BehaviorSubject, combineLatest, Observable } from "rxjs";
import { filter, map, take, tap } from "rxjs/operators";
import { DatabaseObject } from "src/app/shared/models/db-object.model";
import { DetailViewMode } from "src/app/shared/models/detail-view-mode";
import { AuthService } from "src/app/shared/services/auth.service";
import { ObjectService } from "src/app/shared/services/object.service";
import { EntityType } from "src/app/shared/services/ws-api/dto/events";

@UntilDestroy()
@Component({
  selector: "app-default-detail-view",
  templateUrl: "./default-detail-view.component.html",
  styleUrls: ["./default-detail-view.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DefaultDetailViewComponent<T extends DatabaseObject> implements OnInit {

  @Input() public icon: IconDefinition;
  @Input() public entityType: EntityType;
  @Input() public createTitle: string;
  @Input() public titleField = "title";
  @Input() public group: FormGroup;
  @Input() public service: ObjectService<T>;
  @Input() public object$: BehaviorSubject<T>;
  public isSubmitting$ = new BehaviorSubject(false);
  public mode$: Observable<DetailViewMode>;
  public title$ = new BehaviorSubject("Route");
  public canEdit$: Observable<boolean>;
  public canDelete$: Observable<boolean>;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private auth: AuthService
  ) { }

  ngOnInit(): void {

    if (!this.titleField || !this.entityType || !this.service) {
      throw new Error("DetailView titleField entityType and service has to be provided");
    }

    this.mode$ = this.route.data.pipe(map(data => data.detailViewMode || DetailViewMode.View));
    this.canDelete$ = this.auth.authData$.pipe(filter(data => !!data), map(data => data.permissions[this.entityType].includes("delete")));
    this.canEdit$ = this.auth.authData$.pipe(filter(data => !!data), map(data => data.permissions[this.entityType].includes("update")));

    this.route.params
      .pipe(
        untilDestroyed(this),
        filter(params => !!params.id),
        map(params => params.id),
        tap(id => {
          this.service.get(id)
            .pipe(
              untilDestroyed(this),
              filter(d => !!d),
              tap(data => this.title$.next(`${pascalCase(this.entityType)} ${(data as any)[this.titleField]}`)),
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

  public async submit(): Promise<void> {
    this.mode$.pipe(
      untilDestroyed(this),
      take(1),
      tap((mode) => {
        this.isSubmitting$.next(true);
        let sub: Observable<T> = null;
        if (mode === DetailViewMode.Create) {
          sub = this.service.create(this.group.value);
        } else if (mode === DetailViewMode.Edit) {
          sub = this.service.update(Object.assign({ id: this.object$.value.id }, this.group.value));
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
      if (confirm(`Confirm Deletion of ${this.entityType} '${(this.object$.value as any)[this.titleField]}'`)) {
        await this.service.delete(this.object$.value).toPromise();
        this.router.navigate(["../"], { relativeTo: this.route });
      }
    } catch (err) {
      alert(err.message);
    }
  }
}
