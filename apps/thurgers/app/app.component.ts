import { Component, OnInit } from '@angular/core';
import { first, map, shareReplay } from 'rxjs/operators';
import { AngularFirestore, AngularFirestoreCollection, DocumentChangeAction } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';
import { Thurger } from './thuger';
import { timer } from 'rxjs/observable/timer';
import { addDays } from 'date-fns';

function snapshotChangesId<T>(items: DocumentChangeAction[]): any  {
  return items.map(a => {
    const data = a.payload.doc.data();
    const id = a.payload.doc.id;
    return { id, ...data };
  });
}

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent implements OnInit {

  constructor(
    private afs: AngularFirestore
  ) { }

  thurgersRef: AngularFirestoreCollection<Thurger>;
  thurgers$: Observable<Thurger[]>;
  thurgerTime$: Observable<string>;
  counts$: Observable<{ Chicken: number; Beef: number }>;

  thurgerIds$: Observable<Thurger[]>;

  ngOnInit() {
    this.thurgersRef = this.afs.collection<Thurger>('thurgers');

    this.thurgerIds$ = this.thurgersRef.snapshotChanges()
      .map(thurgers => snapshotChangesId<Thurger>(thurgers))
      .pipe(shareReplay());


    this.counts$ = this.thurgerIds$
      .map(thurgers => {
        const count = {
          Chicken: 0,
          Beef: 0,
        };
        thurgers.forEach(t => {
          if (t.choice === 'Beef') {
            count.Beef += 1;
          } else if (t.choice === 'Chicken') {
            count.Chicken += 1;
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

  t() {
    const MIN_IN_MS = 60 * 1000;
    const HOUR_IN_MS = 60 * MIN_IN_MS;
    const DAY_IN_MS = 24 * HOUR_IN_MS;

    const msDiff = 12345;

    const days = Math.floor(msDiff / DAY_IN_MS);
    let rem = msDiff % DAY_IN_MS;
    const hours = Math.floor(rem / HOUR_IN_MS);
    rem = rem % HOUR_IN_MS;
    const minutes = Math.floor(rem / MIN_IN_MS);
    rem = rem % MIN_IN_MS;
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

  select(id: string, name: string, choice: 'Chicken' | 'Beef') {
    this.thurgersRef.doc(id).update({
      name,
      choice,
    });
  }

  add() {
    this.thurgersRef.add({
      name: null,
      choice: null,
      addedAt: new Date().toISOString()
    });
  }

  reset() {
    this.thurgerIds$
      .pipe(first())
      .subscribe(ts => {
        ts.forEach(t => {
          this.remove(t.id);
        });
      });
  }

  remove(id: string) {
    return this.thurgersRef.doc(id).delete();
  }
}