import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Route } from "../../shared/models/route.model";
import { ObjectService } from "../../shared/services/object.service";
import { WsClient } from "../../shared/services/ws-api/ws-client";

@Injectable({
  providedIn: "root"
})
export class RouteService extends ObjectService<Route> {

  constructor(http: HttpClient, wsClient: WsClient) {
    super(http, wsClient, "route", "routes");
  }
}


