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

  public create(route: Route): Observable<Route> {
    return this.http.post<Route>(`${environment.apiUrl}/v1/routes`, route);
  }

  public update(route: Route): Observable<Route> {
    return this.http.put<Route>(`${environment.apiUrl}/v1/routes/${route.id}`, route);
  }

  public delete(route: Route): Observable<Route> {
    return this.http.delete<Route>(`${environment.apiUrl}/v1/routes/${route.id}`);
  }

  constructor(private http: HttpClient) {
    this.createSocket();
  }

  private createSocket(): void {
    const ws = new WebSocket(environment.apiUrl.split("http").join("ws") + "/ws/v1");
    ws.onmessage = ev => {
      this.list$.next(JSON.parse(ev.data));
    };
    ws.onerror = ev => {
      console.log("Websocket Error:", ev);
    };
    ws.onclose = ev => {
      console.log("Websocket closed:", ev);
      this.reconnect();
    };
  }

  private reconnect(): void {
    setTimeout(() => {
      console.log("Reconnecting WebSocket");
      this.createSocket();
    }, 5000);
  }

}
