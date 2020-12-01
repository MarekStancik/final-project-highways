import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { Auth } from "../models/auth.model";

@Injectable({
    providedIn: "root"
})
export class UserService {
    public sessionToken: string;
    public authData$: BehaviorSubject<Auth.Info> = new BehaviorSubject(null);
}