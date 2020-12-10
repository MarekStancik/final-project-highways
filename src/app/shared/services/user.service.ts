import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { Auth } from "../models/auth.model";
import { UserModel } from "../models/user.model";
import { AuthService } from "./auth.service";
import { ObjectService } from "./object.service";
import { WsClient } from "./ws-api/ws-client";

@Injectable({
    providedIn: "root"
})
export class UserService extends ObjectService<UserModel> {
    constructor(http: HttpClient, wsClient: WsClient) {
        super(http,wsClient,"user","users");
    }
}