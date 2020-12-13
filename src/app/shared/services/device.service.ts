import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { DeviceModel } from "../models/device.model";
import { ObjectService } from "./object.service";
import { WsClient } from "./ws-api/ws-client";

@Injectable({
  providedIn: "root"
})
export class DeviceService extends ObjectService<DeviceModel>{

  constructor(http: HttpClient, ws: WsClient) {
    super(http, ws, "device", "devices");
  }
}
