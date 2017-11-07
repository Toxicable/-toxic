import { LiteRoute } from './interfaces';
import { InjectionToken } from '@angular/core';

export const ROUTER_LITE_ROUTES = new InjectionToken<LiteRoute[]>('ROUTER_LITE_ROUTES');
export const ROUTER_LITE_INITIAL_ROUTE = new InjectionToken<LiteRoute[]>('ROUTER_LITE_INITIAL_ROUTE');

