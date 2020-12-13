import { ChangeDetectionStrategy, Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { Observable, timer } from "rxjs";
import { map, tap } from "rxjs/operators";

@Component({
  templateUrl: "./unauthorized-view.component.html",
  styleUrls: ["./unauthorized-view.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UnauthorizedViewComponent implements OnInit {

  public seconds$: Observable<number>;

  constructor(private router: Router) { }

  ngOnInit(): void {
    this.seconds$ = timer(0, 1000).pipe(map(n => 5 - n), tap(n => n === 0 ? this.router.navigate(["/", "app"]) : ""));
  }


}
