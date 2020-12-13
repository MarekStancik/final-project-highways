import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { NodeModel } from "../models/node.model";
import { ObjectService } from "./object.service";
import { WsClient } from "./ws-api/ws-client";

@Injectable({
  providedIn: "root"
})
export class NodeService extends ObjectService<NodeModel>{

  constructor(http: HttpClient, ws: WsClient) {
    super(http, ws, "node", "nodes");
  }
}
