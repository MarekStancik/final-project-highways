import { ChangeDetectionStrategy, Component, OnInit, ViewChild } from "@angular/core";
import { FormControl, FormGroup } from "@angular/forms";
import { faBacon } from "@fortawesome/free-solid-svg-icons";
import { UntilDestroy } from "@ngneat/until-destroy";
import { BehaviorSubject, Observable } from "rxjs";
import { map, startWith } from "rxjs/operators";
import { Route } from "src/app/shared/models/route.model";
import { RouteService } from "src/app/shared/services/route.service";
import { DefaultDetailViewComponent } from "../../components/data/default-detail-view/default-detail-view.component";

@UntilDestroy()
@Component({
  templateUrl: "./routes-detail-view.component.html",
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RoutesDetailViewComponent implements OnInit {

  @ViewChild(DefaultDetailViewComponent) child: DefaultDetailViewComponent<Route>;

  public icon = faBacon;
  public group = new FormGroup({
    start: new FormControl(""),
    end: new FormControl(""),
    name: new FormControl(""),
    length: new FormControl(0)
  });
  public options: string[] = ["One", "Two", "Three"];
  public filteredOptions$: Observable<string[]>;
  public object$ = new BehaviorSubject<Route>(null);

  constructor(public routeService: RouteService) { }

  ngOnInit(): void {
    this.filteredOptions$ = this.group.get("start").valueChanges.pipe(
      startWith(""),
      map(value => this._filter(value))
    );
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.options.filter(option => option.toLowerCase().indexOf(filterValue) === 0);
  }
}
