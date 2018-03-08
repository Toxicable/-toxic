import { Component, OnInit } from '@angular/core';
import { FormControl, Validators, FormGroup, AbstractControl } from '@angular/forms';
import { AngularFireAuth, AngularFireAuthModule} from 'angularfire2/auth';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { User } from './user';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  template: `
    <h1>Login</h1>
    <form [formGroup]="form" (ngSubmit)="submit()">
      <mat-form-field>
        <input matInput placeholder="Email" formControlName="email" />
        <mat-error *ngIf="form.get('email').hasError('email')">You must enter a valid Email</mat-error>
        <mat-error *ngIf="form.get('email').hasError('notRlEmail')">Your Email must be one of ours</mat-error>
        <mat-error *ngIf="form.get('email').hasError('emailExists')">This Email exists already</mat-error>
      </mat-form-field>
      <mat-form-field>
        <input matInput placeholder="Password" formControlName="password" />
      </mat-form-field>
      <button mat-raised-button color="primary" [disabled]="submitting" >Submit</button>
      <div *ngIf="submitting">Submitting...</div>
      <div *ngIf="failed">Something went wrong, sorry :/ Probs wrong password</div>
    </form>
  `
})

export class LoginComponent {
  form = new FormGroup({
    email: new FormControl(null, [Validators.email, this.emailValidator]),
    password: new FormControl()
  });
  usersRef: AngularFirestoreCollection<User>;
  submitting = false;
  failed = false;

  emailValidator(c: AbstractControl) {
    return c.value && (c.value as string).endsWith('@rocketlab.co.nz') ? null : {
      notRlEmail: true,
    };
  }

  constructor(private readonly afAuth: AngularFireAuth, private readonly db: AngularFirestore, private readonly router: Router) {
    this.usersRef = this.db.collection('users');
  }

  submit() {
    if (!this.form.valid) {
      return;
    }
    this.submitting = true;
    this.failed = false;
    const value = this.form.value;
    this.usersRef.ref.where('email', '==', value.email).get().then(query => {
      if (query.empty) {
        return this.afAuth.auth.createUserAndRetrieveDataWithEmailAndPassword(value.email, value.password)
          .then(result => {
            return this.db.collection<User>('users')
              .add({
                addedAt: new Date().toISOString(),
                email: value.email,
              });
          });
      } else {
        return this.afAuth.auth.signInAndRetrieveDataWithEmailAndPassword(value.email, value.password);
      }
    })
    .then(_ => {
      this.submitting = false;
      this.router.navigateByUrl('/');
    })
    .catch(err => {
      this.submitting = false;
      this.failed = true;
    });
  }
}
