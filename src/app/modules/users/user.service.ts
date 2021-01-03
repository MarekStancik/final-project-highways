import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { UserModel } from "../../shared/models/user.model";
import { ObjectService } from "../../shared/services/object.service";
import { WsClient } from "../../shared/services/ws-api/ws-client";

@Injectable({
    providedIn: "root"
})
export class UserService extends ObjectService<UserModel> {
    constructor(http: HttpClient, wsClient: WsClient) {
        super(http, wsClient, "user", "users");
    }
}
