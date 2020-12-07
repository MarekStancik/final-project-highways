import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";
import { filter, map } from "rxjs/operators";
import { environment } from "src/environments/environment";
import { Route } from "../models/route.model";

@Injectable({
  providedIn: "root"
})
export class RouteService {

  public list$: BehaviorSubject<Route[]> = new BehaviorSubject(null);

  public get(id: string): Observable<Route> {
    return this.list$.pipe(
      filter(d => !!d),
      map(d => d.find(p => p.id === id))
    );
  }

  constructor(private http: HttpClient) {
    const ws = new WebSocket(environment.apiUrl.split("http").join("ws") + "/ws/v1");
    ws.onmessage = ev => {
      this.list$.next(JSON.parse(ev.data))
    }
  }
}
