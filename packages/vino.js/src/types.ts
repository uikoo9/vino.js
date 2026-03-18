export interface VinoRequest {
  url: string;
  method: string;
  headers: Record<string, string | undefined>;
  query: Record<string, string>;
  params: Record<string, string>;
  body: unknown;
}

export interface VinoResponse {
  json(data: unknown): void;
  send(data: string): void;
  html(data: string): void;
  redirect(url: string, status?: number): void;
  status(code: number): VinoResponse;
}

export type RouteHandler = (req: VinoRequest, res: VinoResponse) => unknown | Promise<unknown>;

export type HTTPMethod = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH' | 'HEAD' | 'OPTIONS' | 'CONNECT' | 'TRACE';

export interface VinoApp {
  get(route: string, handler: RouteHandler): VinoApp;
  post(route: string, handler: RouteHandler): VinoApp;
  put(route: string, handler: RouteHandler): VinoApp;
  delete(route: string, handler: RouteHandler): VinoApp;
  patch(route: string, handler: RouteHandler): VinoApp;
  head(route: string, handler: RouteHandler): VinoApp;
  options(route: string, handler: RouteHandler): VinoApp;
  connect(route: string, handler: RouteHandler): VinoApp;
  trace(route: string, handler: RouteHandler): VinoApp;
  all(route: string, handler: RouteHandler): VinoApp;
  fetch(request: Request | string, init?: RequestInit): Response | Promise<Response>;
  listen(port?: number): Promise<void>;
  close(): Promise<void>;
}

export interface VinoConfig {
  port?: number;
}
