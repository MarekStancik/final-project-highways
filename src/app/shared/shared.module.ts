import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";
import { MatButtonModule } from "@angular/material/button";
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
  ],
  exports: [
    RouterModule,
    MatButtonModule,
    FontAwesomeModule
  ]
})
export class SharedModule {
  static forRoot(){
    return{
      ngModule: SharedModule
    };
  }
 }
