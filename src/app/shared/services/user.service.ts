import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { Auth } from "../models/auth.model";
import { UserModel } from "../models/user.model";
import { AuthService } from "./auth.service";
import { ObjectService } from "./object.service";

@Injectable({
    providedIn: "root"
})
export class UserService extends ObjectService<UserModel> {
    constructor(http: HttpClient, auth: AuthService) {
        super(http,auth,"user","users");
    }
}