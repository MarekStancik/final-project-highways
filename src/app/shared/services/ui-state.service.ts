import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";

@Injectable({
  providedIn: "root"
})
export class UiStateService {

  public topMenuTitle$ = new BehaviorSubject("");

  constructor() { }
}
