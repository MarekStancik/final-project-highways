import { ChangeDetectionStrategy, Component, OnInit } from "@angular/core";

@Component({
  selector: "app-default-list-view",
  templateUrl: "./default-list-view.component.html",
  styleUrls: ["./default-list-view.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DefaultListViewComponent implements OnInit {
  public detailOpened = false;

  constructor() { }

  ngOnInit(): void {
  }

}
