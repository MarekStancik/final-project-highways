import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { DeviceModel } from "../../shared/models/device.model";
import { ObjectService } from "../../shared/services/object.service";
import { WsClient } from "../../shared/services/ws-api/ws-client";

@Injectable({
  providedIn: "root"
})
export class DeviceService extends ObjectService<DeviceModel>{

  constructor(http: HttpClient, ws: WsClient) {
    super(http, ws, "device", "devices");
  }
}
