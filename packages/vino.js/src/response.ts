import type { H3Event } from 'h3';
import type { VinoResponse } from './types';

const kResponse = Symbol('response');

interface ResponseState {
  statusCode: number;
  body: unknown;
  headers: Record<string, string>;
}

export function createResponse(event: H3Event): VinoResponse {
  const state: ResponseState = {
    statusCode: 200,
    body: undefined,
    headers: {},
  };

  (event as unknown as Record<symbol, ResponseState>)[kResponse] = state;

  const res: VinoResponse = {
    status(code: number) {
      state.statusCode = code;
      return res;
    },
    json(data: unknown) {
      state.headers['content-type'] = 'application/json';
      state.body = data;
    },
    send(data: string) {
      state.headers['content-type'] = 'text/plain';
      state.body = data;
    },
    html(data: string) {
      state.headers['content-type'] = 'text/html';
      state.body = data;
    },
    redirect(url: string, status = 302) {
      state.statusCode = status;
      state.headers['location'] = url;
      state.body = '';
    },
  };

  return res;
}

export function getResponseState(event: H3Event): ResponseState {
  return (event as unknown as Record<symbol, ResponseState>)[kResponse];
}
