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
import { DetailHeaderComponent } from './detail-header/detail-header.component';
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";
import { DetailFieldComponent } from './detail-field/detail-field.component';
import { SharedModule } from "src/app/shared/shared.module";



@NgModule({
  declarations: [DefaultDetailViewComponent,DefaultListViewComponent, DetailHeaderComponent, DetailFieldComponent],
  imports: [
    CommonModule,
    RouterModule,
    MatSidenavModule,
    SharedModule,
    FontAwesomeModule
  ],
  exports: [
    DefaultDetailViewComponent,
    DefaultListViewComponent,
    DetailHeaderComponent,
    DetailFieldComponent,
    MatTableModule,
    MatInputModule,
    MatPaginatorModule,
    MatSortModule,
  ]
})
export class DataModule { }
