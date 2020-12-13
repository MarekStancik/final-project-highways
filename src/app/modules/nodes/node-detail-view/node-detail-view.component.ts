import { ChangeDetectionStrategy, Component, ViewChild } from "@angular/core";
import { FormControl, FormGroup } from "@angular/forms";
import { faArrowsAlt, faBacon } from "@fortawesome/free-solid-svg-icons";
import { BehaviorSubject } from "rxjs";
import { NodeModel } from "src/app/shared/models/node.model";
import { NodeService } from "src/app/shared/services/node.service";
import { DefaultDetailViewComponent } from "../../components/data/default-detail-view/default-detail-view.component";

@Component({
  templateUrl: "./node-detail-view.component.html",
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NodeDetailViewComponent {


  @ViewChild(DefaultDetailViewComponent) child: DefaultDetailViewComponent<NodeModel>;

  public icon = faArrowsAlt;
  public group = new FormGroup({
    name: new FormControl(""),
    location: new FormGroup({
      longitude: new FormControl(""),
      latitude: new FormControl(""),
    })
  });
  public object$ = new BehaviorSubject<NodeModel>(null);

  constructor(public nodeService: NodeService) { }

  public getLink(location: { longitude: string; latitude: string }): string {
    return location ? `https://maps.google.com/?ll=${location.latitude},${location.longitude}` : "";
  }
}
