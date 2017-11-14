import { Component } from '@angular/core';
import { LiteRouter } from '../../src';

@Component({
  selector: 'app-comp2',
  template: `
  Home
  {{(router.params | async)?.name}}
  `
})
export class Comp2Component {
  constructor(
    public readonly router: LiteRouter
  ) { }
}

@Component({
  selector: 'app-comp1',
  template: `
  comp1
  `
})
export class Comp1Component {
}


@Component({
  selector: 'app-root',
  template: `
  <button (click)="router.navigate('')">/</button>
  <a rlLink="home">home</a>
  <a rlLink="home/2">home/2</a>
  <a rlLink="home/2?foo=bar">home/2?foo=bar</a>
  <a rlLink="home/2?age=30">home/2?age=30</a>

  <br />
  Params:
  {{router.params | async | json}}

  <br />
  URL: {{router.url | async}}

  <hr />

  <lr-outlet></lr-outlet>
  `
})
export class AppComponent {
  constructor(
    public readonly router: LiteRouter
  ) { }
}
