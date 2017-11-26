import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AgmCoreModule } from '@agm/core';


import { AppComponent } from './app.component';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyBUNUN-r7YDLYvW_tk2ISGfSTZGA0B2XXc'
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
