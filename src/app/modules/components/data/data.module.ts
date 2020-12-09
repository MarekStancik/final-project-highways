import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from "@angular/router";
import { MatSidenavModule } from "@angular/material/sidenav";
import { DefaultDetailViewComponent } from "./default-detail-view/default-detail-view.component";
import { DefaultListViewComponent } from "./default-list-view/default-list-view.component";
import { MatInputModule } from "@angular/material/input";
import { MatPaginatorModule } from "@angular/material/paginator";
import { MatSortModule } from "@angular/material/sort";
import { MatTableModule } from "@angular/material/table";



@NgModule({
  declarations: [DefaultDetailViewComponent,DefaultListViewComponent],
  imports: [
    CommonModule,
    RouterModule,
    MatSidenavModule
  ],
  exports: [
    DefaultListViewComponent,
    MatTableModule,
    MatInputModule,
    MatPaginatorModule,
    MatSortModule,
  ]
})
export class DataModule { }
