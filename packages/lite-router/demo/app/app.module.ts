import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent, Comp1Component, Comp2Component } from './app.component';

import { LiteRouterModule, LiteRouter } from '../../src';

@NgModule({
  declarations: [
    AppComponent,
    Comp1Component,
    Comp2Component
  ],
  imports: [
    BrowserModule,
    LiteRouterModule.withRoutes([
      { path: 'home/:name', component: Comp2Component },
      { path: 'home', component: Comp2Component },
      { path: '', component: Comp1Component },
    ])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
