import { ChangeDetectionStrategy, Component } from "@angular/core";
import { NodeModel } from "src/app/shared/models/node.model";
import { NodeService } from "src/app/shared/services/node.service";
import { DefaultTableDirective } from "../../components/data/default-table";

@Component({
  templateUrl: "./node-list-view.component.html",
  styleUrls: ["./node-list-view.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NodeListViewComponent extends DefaultTableDirective<NodeModel> {
  displayedColumns = ["name", "location"];

  constructor(nodeService: NodeService) {
    super(nodeService);
  }
}
