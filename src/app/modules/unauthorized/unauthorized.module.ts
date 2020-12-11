import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { UnauthorizedRoutingModule } from "./unauthorized-routing.module";
import { UnauthorizedViewComponent } from "./unauthorized-view/unauthorized-view.component";



@NgModule({
  declarations: [UnauthorizedViewComponent],
  imports: [
    CommonModule,
    UnauthorizedRoutingModule
  ]
})
export class UnauthorizedModule { }
