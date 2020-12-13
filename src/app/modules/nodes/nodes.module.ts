import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { SharedModule } from "src/app/shared/shared.module";
import { DataModule } from "../components/data/data.module";
import { NodeDetailViewComponent } from "./node-detail-view/node-detail-view.component";
import { NodeListViewComponent } from "./node-list-view/node-list-view.component";
import { NodesRoutingModule } from "./nodes-routing.module";



@NgModule({
  declarations: [NodeDetailViewComponent, NodeListViewComponent],
  imports: [
    CommonModule,
    NodesRoutingModule,
    SharedModule,
    DataModule
  ]
})
export class NodesModule { }
