import { H3 } from 'h3';
import { serve } from 'srvx';
import { createRequest } from './request';
import { createResponse, getResponseState } from './response';
import type { VinoApp, VinoConfig, RouteHandler, HTTPMethod } from './types';

const methods = ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'HEAD', 'OPTIONS', 'CONNECT', 'TRACE'] as const;

import type { H3Event } from 'h3';

function wrapHandler(handler: RouteHandler) {
  return async (event: H3Event) => {
    const req = createRequest(event);
    const res = createResponse(event);
    await handler(req, res);
    const state = getResponseState(event);
    const isNullBody = state.statusCode === 204 || state.statusCode === 304;
    return new Response(isNullBody ? null : typeof state.body === 'string' ? state.body : JSON.stringify(state.body), {
      status: state.statusCode,
      headers: state.headers,
    });
  };
}

export function createApp(config: VinoConfig = {}): VinoApp {
  const h3 = new H3();
  let server: { close: () => Promise<void> } | undefined;

  const app: VinoApp = {
    all(route: string, handler: RouteHandler) {
      h3.all(route, wrapHandler(handler));
      return app;
    },
    fetch(request: Request | string, init?: RequestInit) {
      return h3.fetch(typeof request === 'string' ? new Request(request, init) : request);
    },
    listen(port?: number) {
      const p = port ?? config.port ?? 5277;
      return new Promise<void>((resolve) => {
        server = serve({ fetch: h3.fetch, port: p });
        resolve();
      });
    },
    close() {
      return server?.close?.() ?? Promise.resolve();
    },
  } as VinoApp;

  for (const method of methods) {
    const key = method.toLowerCase() as Lowercase<HTTPMethod>;
    app[key] = (route: string, handler: RouteHandler) => {
      h3.on(method, route, wrapHandler(handler));
      return app;
    };
  }

  return app;
}
