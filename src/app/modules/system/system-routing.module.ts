import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SystemViewComponent } from "./system-view/system-view.component";

const routes: Routes = [
  {
    path: "",
    component: SystemViewComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SystemRoutingModule { }
