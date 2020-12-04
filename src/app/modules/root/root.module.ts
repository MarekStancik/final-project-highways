import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RootRoutingModule } from './root-routing.module';
import { RootViewComponent } from './root-view/root-view.component';


@NgModule({
  declarations: [RootViewComponent],
  imports: [
    CommonModule,
    RootRoutingModule
  ]
})
export class RootModule { }
