import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { FormControl, Validators, FormGroup, AbstractControl } from '@angular/forms';
import { AngularFireAuth, AngularFireAuthModule} from 'angularfire2/auth';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { User } from './user';
import { Router } from '@angular/router';
import * as firebase from 'firebase/app';

@Component({

  selector: 'app-login',
  template: `
    <h1>Login</h1>
    <button (click)="login()" mat-raised-button color="primary" >Login</button>
    <div>{{errorMessage}}</div>
  `
})

export class LoginComponent {
  errorMessage: string;

  constructor(private readonly afAuth: AngularFireAuth, private readonly router: Router, private cdr: ChangeDetectorRef) {
  }

  login() {
    this.afAuth.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider())
    .then(state => {
        if ((state.user.email as string).endsWith('@rocketlab.co.nz')) {
          this.router.navigateByUrl('/');
        } else {
          this.errorMessage = 'You signed in with the wrong account. It must be one of ours';
          this.afAuth.auth.signOut();
          this.cdr.detectChanges();
        }
      });
  }
}
