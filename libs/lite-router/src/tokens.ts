import { LiteRoute } from './interfaces';
import { InjectionToken } from '@angular/core';

export const LITE_ROUTER_ROUTES = new InjectionToken<LiteRoute[]>('LITE_ROUTER_ROUTES');
export const LITE_ROUTER_INITIAL_ROUTE = new InjectionToken<LiteRoute[]>('LITE_ROUTER_INITIAL_ROUTE');

