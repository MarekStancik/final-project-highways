import { BrowserModule } from "@angular/platform-browser";
import { APP_INITIALIZER, NgModule } from "@angular/core";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { TokenInterceptor } from "./interceptors/token.interceptor";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { FaIconLibrary } from "@fortawesome/angular-fontawesome";
import { fab } from "@fortawesome/free-brands-svg-icons";
import { far } from "@fortawesome/free-regular-svg-icons";
import { fas } from "@fortawesome/free-solid-svg-icons";

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    },
    /* configure font awesome icon packs */
    {
      provide: APP_INITIALIZER,
      useFactory: (library: FaIconLibrary) => () => library.addIconPacks(fas, far, fab),
      deps: [FaIconLibrary],
      multi: true
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
