import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { NodeModel } from "../../shared/models/node.model";
import { ObjectService } from "../../shared/services/object.service";
import { WsClient } from "../../shared/services/ws-api/ws-client";

@Injectable({
  providedIn: "root"
})
export class NodeService extends ObjectService<NodeModel>{

  constructor(http: HttpClient, ws: WsClient) {
    super(http, ws, "node", "nodes");
  }
}
