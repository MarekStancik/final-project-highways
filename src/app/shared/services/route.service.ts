import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Route } from "../models/route.model";
import { AuthService } from "./auth.service";
import { ObjectService } from "./object.service";
import { UserService } from "./user.service";

@Injectable({
  providedIn: "root"
})
export class RouteService extends ObjectService<Route> {

  constructor(http: HttpClient,auth: AuthService) {
    super(http,auth,"route","routes");
  }
}


