import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { RootRoutingModule } from "./root-routing.module";
import { RootViewComponent } from "./root-view/root-view.component";
import { MainMenuComponent } from "./components/main-menu/main-menu.component";
import { TopMenuComponent } from "./components/top-menu/top-menu.component";
import { SharedModule } from "src/app/shared/shared.module";
import { MatMenuModule } from "@angular/material/menu";


@NgModule({
  declarations: [RootViewComponent, MainMenuComponent, TopMenuComponent],
  imports: [
    CommonModule,
    RootRoutingModule,
    SharedModule,
    MatMenuModule
  ]
})
export class RootModule { }
