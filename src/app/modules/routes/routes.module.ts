import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { MatAutocompleteModule } from "@angular/material/autocomplete";
import { MatTabsModule } from "@angular/material/tabs";
import { SharedModule } from "src/app/shared/shared.module";
import { DataModule } from "../components/data/data.module";
import { RoutesDetailViewComponent } from "./routes-detail-view/routes-detail-view.component";
import { RoutesListViewComponent } from "./routes-list-view/routes-list-view.component";
import { RoutesRoutingModule } from "./routes-routing.module";


@NgModule({
  declarations: [RoutesListViewComponent, RoutesDetailViewComponent],
  imports: [
    CommonModule,
    RoutesRoutingModule,
    MatAutocompleteModule,
    MatTabsModule,
    SharedModule,
    DataModule
  ]
})
export class RoutesModule { }
