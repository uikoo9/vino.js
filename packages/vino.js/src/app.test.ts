import { describe, it, expect } from 'vitest';
import { createApp } from './app';

describe('router', () => {
  it('should register all HTTP method shortcuts', () => {
    const app = createApp();
    const methods = ['get', 'post', 'put', 'delete', 'patch', 'head', 'options', 'connect', 'trace'] as const;
    for (const method of methods) {
      expect(app[method]).toBeTypeOf('function');
    }
    expect(app.all).toBeTypeOf('function');
  });

  it('GET /hello should return json', async () => {
    const app = createApp();
    app.get('/hello', (_req, res) => {
      res.json({ msg: 'hello' });
    });
    const resp = await app.fetch('http://localhost/hello');
    expect(resp.status).toBe(200);
    expect(await resp.json()).toEqual({ msg: 'hello' });
  });

  it('POST /user should return json', async () => {
    const app = createApp();
    app.post('/user', (_req, res) => {
      res.json({ ok: true });
    });
    const resp = await app.fetch('http://localhost/user', { method: 'POST' });
    expect(resp.status).toBe(200);
    expect(await resp.json()).toEqual({ ok: true });
  });

  it('PUT /user/:id should return params', async () => {
    const app = createApp();
    app.put('/user/:id', (req, res) => {
      res.json({ id: req.params.id });
    });
    const resp = await app.fetch('http://localhost/user/42', { method: 'PUT' });
    expect(await resp.json()).toEqual({ id: '42' });
  });

  it('DELETE should support custom status', async () => {
    const app = createApp();
    app.delete('/user/:id', (_req, res) => {
      res.status(204).send('');
    });
    const resp = await app.fetch('http://localhost/user/1', { method: 'DELETE' });
    expect(resp.status).toBe(204);
  });

  it('PATCH should work', async () => {
    const app = createApp();
    app.patch('/item/:id', (req, res) => {
      res.json({ patched: req.params.id });
    });
    const resp = await app.fetch('http://localhost/item/7', { method: 'PATCH' });
    expect(await resp.json()).toEqual({ patched: '7' });
  });

  it('all() should match any method', async () => {
    const app = createApp();
    app.all('/any', (_req, res) => {
      res.send('ok');
    });
    const get = await app.fetch('http://localhost/any');
    const post = await app.fetch('http://localhost/any', { method: 'POST' });
    expect(await get.text()).toBe('ok');
    expect(await post.text()).toBe('ok');
  });

  it('should return query params', async () => {
    const app = createApp();
    app.get('/search', (req, res) => {
      res.json(req.query);
    });
    const resp = await app.fetch('http://localhost/search?q=test&page=1');
    expect(await resp.json()).toEqual({ q: 'test', page: '1' });
  });

  it('res.html() should return html content-type', async () => {
    const app = createApp();
    app.get('/page', (_req, res) => {
      res.html('<h1>hi</h1>');
    });
    const resp = await app.fetch('http://localhost/page');
    expect(resp.headers.get('content-type')).toBe('text/html');
    expect(await resp.text()).toBe('<h1>hi</h1>');
  });

  it('res.redirect() should set location header', async () => {
    const app = createApp();
    app.get('/old', (_req, res) => {
      res.redirect('/new');
    });
    const resp = await app.fetch('http://localhost/old', { redirect: 'manual' });
    expect(resp.status).toBe(302);
    expect(resp.headers.get('location')).toBe('/new');
  });
});
