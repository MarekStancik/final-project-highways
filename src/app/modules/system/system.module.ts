import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { SystemRoutingModule } from "./system-routing.module";
import { SystemViewComponent } from "./system-view/system-view.component";


@NgModule({
  declarations: [SystemViewComponent],
  imports: [
    CommonModule,
    SystemRoutingModule
  ]
})
export class SystemModule { }
