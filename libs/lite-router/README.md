# @toxicable/lite-router

Just a little Router that uses similar conventions to @angular/router
It dosen't support much only basic url Params.
* no guards
* no lazyloading
* no child routes

just a nice and easy flat layout with easy to access param data

However, it only weighs ~10kb

Demo: https://stackblitz.com/edit/toxicable-lite-router-demo

## Installation

`yarn add @toxicable/lite-router`

## Import

```typescript
imports: [
    LiteRouterModule.withRoutes([
      { path: 'home/:name', component: Comp3},
      { path: 'home', component: Comp2 },
      { path: '', component: Comp1},
    ])
]
```

## lr-outlet

`<lr-outlet></lr-outlet>`

## routerLink

`<button lrLink="./some-route">Some Route!</button>`

or

`<a lrLink="./some-route">Some Route!</a>`

## LiteRouter

```typescript
constructor(
  private readonly router: LiteRouter
){
  router.params.subscibe(params => console.log(params));
}
````
