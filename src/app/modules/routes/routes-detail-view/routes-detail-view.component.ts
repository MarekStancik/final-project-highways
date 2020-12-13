import { ChangeDetectionStrategy, Component, OnInit, ViewChild } from "@angular/core";
import { FormControl, FormGroup } from "@angular/forms";
import { faBacon } from "@fortawesome/free-solid-svg-icons";
import { UntilDestroy } from "@ngneat/until-destroy";
import { BehaviorSubject, Observable } from "rxjs";
import { map, startWith } from "rxjs/operators";
import { NodeModel } from "src/app/shared/models/node.model";
import { Route } from "src/app/shared/models/route.model";
import { NodeService } from "src/app/shared/services/node.service";
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
  public nodes: NodeModel[] = [];
  public filteredOptionsStart$: Observable<NodeModel[]>;
  public filteredOptionsEnd$: Observable<NodeModel[]>;
  public object$ = new BehaviorSubject<Route>(null);

  constructor(public routeService: RouteService, private nodeService: NodeService) { }

  ngOnInit(): void {
    this.nodeService.getAll();
    this.nodeService.list.subscribe(nodes => this.nodes = nodes);
    this.filteredOptionsStart$ = this.group.get("start").valueChanges.pipe(
      startWith(""),
      map(value => this._filter(value))
    );

    this.filteredOptionsEnd$ = this.group.get("end").valueChanges.pipe(
      startWith(""),
      map(value => this._filter(value))
    );
  }

  private _filter(value: string): NodeModel[] {
    const filterValue = value.toLowerCase();

    return this.nodes.filter(node => node.name.toLowerCase().indexOf(filterValue) > -1);
  }
}
