import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule, MatSelectModule, MatInputModule } from '@angular/material';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { AngularFireModule } from 'angularfire2';


@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatSelectModule,
    MatInputModule,
    AngularFirestoreModule,
    AngularFireModule.initializeApp({
      apiKey: 'AIzaSyCz1r2UaADi_Xel0-QOpMyLy0gvFWjCbQg',
      authDomain: 'thurgers.firebaseapp.com',
      databaseURL: 'https://thurgers.firebaseio.com',
      projectId: 'thurgers',
      storageBucket: 'thurgers.appspot.com',
      messagingSenderId: '1016886607087'
    }),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
