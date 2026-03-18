import type { H3Event } from 'h3';
import { getQuery, getRouterParams, readBody } from 'h3';
import type { VinoRequest } from './types';

export function createRequest(event: H3Event): VinoRequest {
  return {
    get url() {
      return event.url.pathname;
    },
    get method() {
      return event.req.method;
    },
    get headers() {
      return Object.fromEntries(event.req.headers.entries());
    },
    get query() {
      return getQuery(event) as Record<string, string>;
    },
    get params() {
      return getRouterParams(event);
    },
    get body() {
      return readBody(event);
    },
  };
}
