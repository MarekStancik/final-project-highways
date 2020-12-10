import { HttpClient } from "@angular/common/http";
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from "rxjs";
import { filter, map } from "rxjs/operators";
import { environment } from "src/environments/environment";
import { DatabaseObject } from "../models/db-object.model";
import { AuthService } from "./auth.service";
import { UserService } from "./user.service";
import { Message } from "./ws-api/dto";
import { EntityType } from "./ws-api/dto/events";
import { WsClient } from "./ws-api/ws-client";

export class ObjectService<T extends DatabaseObject> {

  public list$: BehaviorSubject<T[]> = new BehaviorSubject(null);

  public get(id: string): Observable<T> {
    return this.list$.pipe(
      filter(d => !!d),
      map(d => d.find(p => p._id === id))
    );
  }

  public getAll(): void {
    this.http.get<T[]>(`${environment.apiUrl}/v1/${this.path}`).subscribe(l => this.list$.next(l));
  }

  public create(obj: T): Observable<T> {
    return this.http.post<T>(`${environment.apiUrl}/v1/${this.path}`, obj);
  }

  public update(obj: T): Observable<T> {
    return this.http.put<T>(`${environment.apiUrl}/v1/${this.path}/${obj._id}`, obj);
  }

  public delete(obj: T): Observable<T> {
    return this.http.delete<T>(`${environment.apiUrl}/v1/${this.path}/${obj._id}`);
  }

  constructor(private http: HttpClient,client: WsClient,entityType: EntityType, private path: string) {;
    client.listen<T>("update",entityType).subscribe(updatedObj => this.list$.next(this.list$.value.map(obj => obj._id === updatedObj._id ? updatedObj : obj)));
    client.listen<T>("delete",entityType).subscribe(deletedObj => this.list$.next(this.list$.value.filter(obj => obj._id !== deletedObj._id)));
    client.listen<T>("create",entityType).subscribe(newObj => this.list$.next([...this.list$.value, newObj]));
  }
}
