import { ChangeDetectionStrategy, Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { faArrowLeft, faBacon, faPencilAlt, faTimes, faTrash } from "@fortawesome/free-solid-svg-icons";
import { UntilDestroy, untilDestroyed } from "@ngneat/until-destroy";
import { BehaviorSubject } from "rxjs";
import { filter, take, tap } from "rxjs/operators";
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
  public mode = "view";
  public createTitle = "Create Route";
  public title$ = new BehaviorSubject("Route");
  public icon = faBacon;
  public faTrash = faTrash;
  public faPencil = faPencilAlt;
  public faArrow = faArrowLeft;
  public faTimes = faTimes;

  constructor(private route: ActivatedRoute, private routeService: RouteService) { }

  ngOnInit(): void {
    this.route.params
      .pipe(
        untilDestroyed(this),
        tap(params => {
          this.routeService.get(params.id)
            .pipe(
              take(1),
              tap(data => this.title$.next(`Route ${data.name}`))
            ).subscribe();
        })
      )
      .subscribe();
  }


}
