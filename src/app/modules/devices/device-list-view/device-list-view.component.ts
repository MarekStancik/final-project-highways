import { ChangeDetectionStrategy, Component, OnInit } from "@angular/core";
import { DeviceModel } from "src/app/shared/models/device.model";
import { DeviceService } from "src/app/shared/services/device.service";
import { DefaultTableDirective } from "../../components/data/default-table";

@Component({
  templateUrl: "./device-list-view.component.html",
  styleUrls: ["./device-list-view.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DeviceListViewComponent extends DefaultTableDirective<DeviceModel> {
  displayedColumns = ["name", "ipAddress", "state"];

  constructor(deviceService: DeviceService) {
    super(deviceService);
  }

}
