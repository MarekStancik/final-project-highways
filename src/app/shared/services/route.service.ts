import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";
import { filter, map } from "rxjs/operators";
import { environment } from "src/environments/environment";
import { Route } from "../models/route.model";
import { UserService } from "./user.service";
import { WsClient } from "./ws-api/ws-client";

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

  public getAll(): void {
    this.http.get<Route[]>(`${environment.apiUrl}/v1/routes`).subscribe(l => this.list$.next(l));
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

  constructor(private http: HttpClient,private user: UserService) {
    const client = new WsClient(http,user);
    client.listen<Route>("update","route").subscribe(updatedObj => this.list$.next(this.list$.value.map(obj => obj.id === updatedObj.id ? updatedObj : obj)));
    client.listen<Route>("delete","route").subscribe(deletedObj => this.list$.next(this.list$.value.filter(obj => obj.id !== deletedObj.id)));
    client.listen<Route>("create","route").subscribe(newObj => this.list$.next([...this.list$.value, newObj]));
  }
}


