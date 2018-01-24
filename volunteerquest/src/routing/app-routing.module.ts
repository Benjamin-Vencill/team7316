import { Component } from '@angular/core';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';

//Import Components
import { AppComponent } from '../app/app.component';
import { AuthComponent } from '../auth/auth.component';
const appRoutes: Routes = [
  { path: 'auth-component', component: AuthComponent },
  { path: 'map', component: AppComponent },
];

@Component({ 
    selector: 'router-outlet' 
})

@NgModule({
    imports: [
        BrowserModule,
        FormsModule,
        RouterModule.forRoot(
        appRoutes,
        {
          enableTracing: true, // <-- debugging purposes only
  
        }
      )
    ],
    declarations: [
        AuthComponent
    ],
    exports: [
      RouterModule
    ],
    providers: []
  })
  export class AppRoutingModule { }