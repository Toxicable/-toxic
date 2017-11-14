import { PathLocationStrategy, LocationStrategy, PlatformLocation, APP_BASE_HREF, Location } from '@angular/common';
import { LiteRouterLinkWithHref, LiteRouterOutlet, LiteRouterLink } from './directives';
import { NgModule, ModuleWithProviders, Optional, Inject, ANALYZE_FOR_ENTRY_COMPONENTS } from '@angular/core';
import { LiteRoute } from './interfaces';
import { LiteRouter } from './router';
import { DefaultUrlSerializer, UrlSerializer, provideRoutes, ROUTES } from '@angular/router';
import { LITE_ROUTER_INITIAL_ROUTE, LITE_ROUTER_ROUTES} from './tokens';


export function provideLocationStrategy(
  platformLocationStrategy: PlatformLocation, baseHref: string) {
  return new PathLocationStrategy(platformLocationStrategy, baseHref);
}
export function browserInitialRouteFactory() {
  return window.location.pathname + window.location.search;
}

const REEXPORTS = [
  LiteRouterLink,
  LiteRouterLinkWithHref,
  LiteRouterOutlet,
];

@NgModule({
  declarations: [REEXPORTS],
  exports: [REEXPORTS]
})
export class LiteRouterModule {
  static withRoutes(routes: LiteRoute[]): ModuleWithProviders {
    return {
      ngModule: LiteRouterModule,
      providers: [
        LiteRouter,
        Location,
        { provide: LITE_ROUTER_INITIAL_ROUTE, useFactory: browserInitialRouteFactory },

        { provide: UrlSerializer, useClass: DefaultUrlSerializer },
        provideRoutes(routes),
        { provide: LITE_ROUTER_ROUTES, useExisting: ROUTES },
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
