import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { UnauthorizedViewComponent } from "./unauthorized-view/unauthorized-view.component";

const routes: Routes = [
  {
    path: "",
    component: UnauthorizedViewComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UnauthorizedRoutingModule { }
