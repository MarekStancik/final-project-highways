import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";
import { MatButtonModule } from "@angular/material/button";
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";
import { ReactiveFormsModule } from "@angular/forms";
import { MatInputModule } from "@angular/material/input";



@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
  exports: [
    RouterModule,
    MatButtonModule,
    FontAwesomeModule,
    ReactiveFormsModule,
    MatInputModule,
  ]
})
export class SharedModule {
 }
