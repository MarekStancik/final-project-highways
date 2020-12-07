import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { MatTableModule } from "@angular/material/table";
import { MatInputModule } from "@angular/material/input";
import { MatPaginatorModule } from "@angular/material/paginator";
import { MatSortModule } from "@angular/material/sort";
import { MatSidenavModule } from "@angular/material/sidenav";
import { RoutesListViewComponent } from "./routes-list-view/routes-list-view.component";
import { RoutesRoutingModule } from "./routes-routing.module";
import { RoutesDetailViewComponent } from "./routes-detail-view/routes-detail-view.component";
import { SharedModule } from "src/app/shared/shared.module";
import { MatAutocompleteModule } from "@angular/material/autocomplete";
import { MatTabsModule } from "@angular/material/tabs";


@NgModule({
  declarations: [RoutesListViewComponent, RoutesDetailViewComponent],
  imports: [
    CommonModule,
    RoutesRoutingModule,
    MatTableModule,
    MatInputModule,
    MatPaginatorModule,
    MatSortModule,
    MatSidenavModule,
    MatAutocompleteModule,
    MatTabsModule,
    SharedModule
  ]
})
export class RoutesModule { }
