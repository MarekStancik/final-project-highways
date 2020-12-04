import { ChangeDetectionStrategy, Component, OnInit } from "@angular/core";

@Component({
  templateUrl: "./root-view.component.html",
  styleUrls: ["./root-view.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RootViewComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
