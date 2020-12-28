import { ChangeDetectionStrategy, Component } from "@angular/core";

@Component({
  selector: "app-default-list-view",
  templateUrl: "./default-list-view.component.html",
  styleUrls: ["./default-list-view.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DefaultListViewComponent {
  public detailOpened = false;
}
