import { Component, OnInit } from '@angular/core';
import { first, map, shareReplay } from 'rxjs/operators';
import { AngularFirestore, AngularFirestoreCollection, DocumentChangeAction } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';
import { Thurger } from './thuger';
import { timer } from 'rxjs/observable/timer';
import { addDays, distanceInWordsToNow } from 'date-fns';
import { AngularFireAuth } from 'angularfire2/auth';
import { User } from '@firebase/auth-types';

function snapshotChangesId<T>(items: DocumentChangeAction[]): any  {
  return items.map(a => {
    const data = a.payload.doc.data();
    const id = a.payload.doc.id;
    return { id, ...data };
  });
}

@Component({
  selector: 'app-orders',
  templateUrl: 'orders.component.html',
})
export class OrdersComponent implements OnInit {

  constructor(
    private afs: AngularFirestore,
    private afAuth: AngularFireAuth,
  ) { }

  user$: Observable<User>;

  thurgersRef: AngularFirestoreCollection<Thurger>;
  thurgers$: Observable<Thurger[]>;
  thurgerTime$: Observable<string>;
  counts$: Observable<{ Chicken: number; Beef: number }>;

  thurgerIds$: Observable<Thurger[]>;

  ngOnInit() {
    this.thurgersRef = this.afs.collection<Thurger>('thurgers', ref => ref.orderBy('addedAt', 'desc'));
    this.user$ = this.afAuth.authState;

    this.thurgerIds$ = this.thurgersRef.snapshotChanges()
      .map(thurgers => snapshotChangesId<Thurger>(thurgers))
      .map((thurgers: Thurger[]) => {
        return thurgers.map(t => {
          t.addedAt = distanceInWordsToNow(t.updatedAt);
          return t;
        });
      })
      .pipe(
        shareReplay()
      );


    this.counts$ = this.thurgerIds$
      .map(thurgers => {
        const count = {
          Chicken: 0,
          Beef: 0,
          Other: []
        };
        thurgers.forEach(t => {
          if (t.extras) {
            count.Other.push(`${t.choice} + ${t.extras}`);
          } else {
            count[t.choice] += 1;
          }
        });
        return count;
      });

    this.thurgers$ = this.thurgerIds$
      .map(thurgers => thurgers.sort((a, b) => new Date(a.addedAt).getTime() - new Date(b.addedAt).getTime()));

    const thursday = 4;

    this.thurgerTime$ = timer(0, 1000).pipe(
      map(i => {
        let target = new Date();
        target.setHours(12, 0, 0, 0);
        const day = target.getDay();

        if (day > thursday) {
          target = addDays(target, 7 + (thursday - day));
        } else if (day < thursday) {
          target = addDays(target, thursday - day);
        } else {
          if (new Date().getHours() > 12) {
            target = addDays(target, 7);
          }
        }

        const duration = this.getTimeRemaining(target);
        return `${duration.days}d ${duration.hours}h ${duration.minutes}m ${duration.seconds}s`;
      })
    );
  }

  getTimeRemaining(endtime: Date) {
    const t = endtime.getTime() - new Date().getTime();
    const seconds = Math.floor((t / 1000) % 60);
    const minutes = Math.floor((t / 1000 / 60) % 60);
    const hours = Math.floor((t / (1000 * 60 * 60)) % 24);
    const days = Math.floor(t / (1000 * 60 * 60 * 24));
    return {
      'days': days,
      'hours': hours,
      'minutes': minutes,
      'seconds': seconds
    };
}

  trackById(idx: number, item: any) {
    return item['id'];
  }

  update(id: string, choice: 'Chicken' | 'Beef', extras: string) {
    this.thurgersRef.doc(id).update({
      choice,
      extras,
      updatedAt: new Date().toISOString(),
    });
  }

  add(email: string) {
    this.thurgersRef.add({
      email,
      choice: null,
      extras: null,
      addedAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),

    });
  }

  remove(id: string) {
    return this.thurgersRef.doc(id).delete();
  }
}