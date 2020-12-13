import { HttpClient } from "@angular/common/http";
import { BehaviorSubject, Observable } from "rxjs";
import { filter, map } from "rxjs/operators";
import { environment } from "src/environments/environment";
import { DatabaseObject } from "../models/db-object.model";
import { EntityType } from "./ws-api/dto/events";
import { WsClient } from "./ws-api/ws-client";

export class ObjectService<T extends DatabaseObject> {

  private list$: BehaviorSubject<T[]> = new BehaviorSubject([]);

  public get list(): Observable<T[]> {
    return this.list$.pipe();
  }

  public get(id: string): Observable<T> {
    return this.list$.pipe(
      filter(d => !!d),
      map(d => d.find(p => p.id === id))
    );
  }

  public getAll(): void {
    this.http.get<T[]>(`${environment.apiUrl}/v1/${this.path}`)
    .subscribe({
      next: l => this.list$.next(l),
      error: err => {
        console.log(err);
        this.list$.next([]);
      }
    });
  }

  public create(obj: T): Observable<T> {
    return this.http.post<T>(`${environment.apiUrl}/v1/${this.path}`, obj);
  }

  public update(obj: T): Observable<T> {
    return this.http.put<T>(`${environment.apiUrl}/v1/${this.path}/${obj.id}`, obj);
  }

  public delete(obj: T): Observable<T> {
    return this.http.delete<T>(`${environment.apiUrl}/v1/${this.path}/${obj.id}`);
  }

  constructor(private http: HttpClient, client: WsClient, entityType: EntityType, private path: string) {
    client.listen<T>("update", entityType).subscribe(updatedObj => this.list$.next(this.list$.value.map(obj => obj.id === updatedObj.id ? updatedObj : obj)));
    client.listen<T>("delete", entityType).subscribe(deletedObj => this.list$.next(this.list$.value.filter(obj => obj.id !== deletedObj.id)));
    client.listen<T>("create", entityType).subscribe(newObj => this.list$.next([...this.list$.value, newObj]));
  }
}
