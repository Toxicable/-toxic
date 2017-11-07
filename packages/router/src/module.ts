import { PathLocationStrategy, LocationStrategy, PlatformLocation, APP_BASE_HREF, Location } from '@angular/common';
import { RouterLiteLinkWithHref, RouterLiteOutlet, RouterLiteLink } from './directives';
import { NgModule, ModuleWithProviders, Optional, Inject } from '@angular/core';
import { LiteRoute } from './interfaces';
import { RouterLite } from './router';
import { DefaultUrlSerializer, UrlSerializer } from '@angular/router';
import { ROUTER_LITE_INITIAL_ROUTE, ROUTER_LITE_ROUTES} from './tokens';


export function provideLocationStrategy(
  platformLocationStrategy: PlatformLocation, baseHref: string) {
  return new PathLocationStrategy(platformLocationStrategy, baseHref);
}
export function browserInitialRouteFactory() {
  return window.location.pathname + window.location.search;
}

const REEXPORTS = [
  RouterLiteLink,
  RouterLiteLinkWithHref,
  RouterLiteOutlet,
];

@NgModule({
  declarations: [REEXPORTS],
  exports: [REEXPORTS]
})
export class RouterLiteModule {
  static withRoutes(routes: LiteRoute[]): ModuleWithProviders {
    return {
      ngModule: RouterLiteModule,
      providers: [
        RouterLite,
        Location,
        { provide: ROUTER_LITE_INITIAL_ROUTE, useFactory: browserInitialRouteFactory },
        { provide: ROUTER_LITE_ROUTES, useValue: routes },
        { provide: UrlSerializer, useClass: DefaultUrlSerializer },
        {
          provide: LocationStrategy,
          useFactory: provideLocationStrategy,
          deps: [
            PlatformLocation, [new Inject(APP_BASE_HREF), new Optional()]
          ]
        },
      ]
    };
  }
}
