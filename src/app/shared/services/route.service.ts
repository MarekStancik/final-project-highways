import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Route } from "../models/route.model";
import { ObjectService } from "./object.service";
import { UserService } from "./user.service";

@Injectable({
  providedIn: "root"
})
export class RouteService extends ObjectService<Route> {

  constructor(http: HttpClient,user: UserService) {
    super(http,user,"route","routes");
  }
}


