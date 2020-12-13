import { ChangeDetectionStrategy, Component } from "@angular/core";
import { RouteService } from "src/app/shared/services/route.service";
import { Route, RouteStatus } from "../../../shared/models/route.model";
import { DefaultTableDirective } from "../../components/data/default-table";

@Component({
  templateUrl: "./routes-list-view.component.html",
  styleUrls: ["./routes-list-view.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RoutesListViewComponent extends DefaultTableDirective<Route> {

  public displayedColumns: string[] = ["route", "name", "length", "avgTime", "status"];

  constructor(routeService: RouteService) {
    super(routeService);
    this.dataSource.sortingDataAccessor = (item, prop) => {
      if (prop === "route") {
        return item.start;
      }
      return (item as any)[prop];
    };
  }

  public getColorForStatus(status: RouteStatus): string {
    switch (status) {
      case "empty":
        return "#4CAF50";
      case "normal":
        return "#2196F3";
      case "full":
        return "#FF7043";
      case "jammed":
        return "#E53935";
    }
  }
}
