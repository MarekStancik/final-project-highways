import { ChangeDetectionStrategy, Component, ViewChild } from "@angular/core";
import { FormControl, FormGroup } from "@angular/forms";
import { faArrowsAlt, faHdd } from "@fortawesome/free-solid-svg-icons";
import { BehaviorSubject } from "rxjs";
import { DeviceModel } from "src/app/shared/models/device.model";
import { DeviceService } from "src/app/shared/services/device.service";
import { DefaultDetailViewComponent } from "../../components/data/default-detail-view/default-detail-view.component";

@Component({
  templateUrl: "./device-detail-view.component.html",
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DeviceDetailViewComponent {

  @ViewChild(DefaultDetailViewComponent) child: DefaultDetailViewComponent<DeviceModel>;

  public icon = faHdd;
  public group = new FormGroup({
    name: new FormControl(""),
    ipAddress: new FormControl(""),
  });

  public object$ = new BehaviorSubject<DeviceModel>(null);


  constructor(public deviceService: DeviceService) { }

}
