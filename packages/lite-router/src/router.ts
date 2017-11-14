import { ReplaySubject } from 'rxjs/ReplaySubject';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';
import { ComponentFactory, Inject, ComponentFactoryResolver, Injectable } from '@angular/core';
import { UrlSerializer } from '@angular/router';
import { Location } from '@angular/common';
import { LiteRoute } from './interfaces';
import { LITE_ROUTER_ROUTES, LITE_ROUTER_INITIAL_ROUTE } from './tokens';

@Injectable()
export class LiteRouter {
  private _activatedComponent$ = new BehaviorSubject<ComponentFactory<{}>>(null);
  activateComponent$ = this._activatedComponent$.asObservable();

  private _params = new BehaviorSubject<{ [key: string]: string }>({});
  params = this._params.asObservable();

  private _url = new ReplaySubject<string>();
  url = this._url.asObservable();

  constructor(
    @Inject(LITE_ROUTER_ROUTES) private readonly routes: LiteRoute[],
    @Inject(LITE_ROUTER_INITIAL_ROUTE) private readonly initalRoute: string,
    private readonly cfr: ComponentFactoryResolver,
    private readonly urlSeralizer: UrlSerializer,
    private readonly location: Location,
  ) {
    this.navigate(initalRoute);
  }

  navigate(rawTargetUrl: string) {
    const targetUrl = this.urlSeralizer.parse(rawTargetUrl).toString();

    for (let i = 0; i < this.routes.length; i++) {
      const route = this.routes[i];
      const configUrl = this.urlSeralizer.parse(route.path).toString();
      const params = this.matcher(targetUrl, configUrl);
      if (params) {
        this._url.next(targetUrl);
        this._params.next(params);
        const factory = this.cfr.resolveComponentFactory(route.component);

        this.location.go(targetUrl);
        const currentFactory = this._activatedComponent$.getValue();
        if (!this._activatedComponent$.value || factory.componentType !== currentFactory.componentType) {
          this._activatedComponent$.next(factory);
        }
        break;
      }
    }
  }


  private matcher(url: string, configUrl: string) {
    const [urlParts, queryString] = url.split('?');
    const segments = urlParts.split('/');
    const parts = configUrl.split('/');
    if (parts.length > segments.length) {
      return null;
    }

    const params: { [key: string]: string } = {};
    for (let i = 0; i < parts.length; i++) {
      const part = parts[i];
      const segment = segments[i];

      if (part.startsWith(':')) {
        params[part.substring(1)] = segment;
      } else if (part !== segment) {
        return null;
      }
    }
    if (queryString) {
      const queryStringParts = queryString.split('&');
      for (let i = 0; i < queryStringParts.length; i++) {
        const [key, value] = queryStringParts[i].split('=');
        params[key] = value;
      }
    }

    return params;
  }
}
