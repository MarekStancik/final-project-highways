import { ChangeDetectionStrategy, Component } from "@angular/core";
import { DeviceService } from "src/app/modules/devices/device.service";
import { DeviceModel } from "src/app/shared/models/device.model";
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
