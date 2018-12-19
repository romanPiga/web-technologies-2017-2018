import { controllers } from '../../server/controllers';
import request from 'supertest';
import express from 'express';
import router from '../../server/routes';
const app = express();
app.use(router);

describe('Controllers tests', () => {
  test('all should be defined', () => {
    expect(controllers.all).toBeDefined();
  });
  test('search should be defined', () => {
    expect(controllers.search).toBeDefined();
  });
  test('pagination should be defined', () => {
    expect(controllers.pagination).toBeDefined();
  });
  test('sort should be defined', () => {
    expect(controllers.sort).toBeDefined();
  });
  test('get should be defined', () => {
    expect(controllers.get).toBeDefined();
  });

  test('GET /', () => {
    request(app)
      .get('/')
      .expect(200)
      .then(res => {
        expect(res.body).toBeInstanceOf(Array);
        expect(res.body.length).toBe(15600);
      });
  });
  test('GET /search?q=title', () => {
    const title = 'avengers';
    return request(app)
      .get(`/search?q=${title}`)
      .then(res => {
        expect(res.status).toBe(200);
        expect(res.body).toBeInstanceOf(Array);
        expect(res.body[0].title.toLowerCase().includes(title)).toBe(true);
      });
  });
  test('GET /search? should throw an error', () => {
    return request(app)
      .get(`/search?`)
      .then(res => {
        expect(res.status).toBe(422);
      });
  });
  test('GET /pagination?limit=20', () => {
    return request(app)
      .get('/pagination?limit=20')
      .then(res => {
        expect(res.status).toBe(200);
        expect(res.body).toBeInstanceOf(Array);
        expect(res.body.length).toBe(20);
      });
  });
  test('GET /pagination? with negative value should throw 422 error', () => {
    return request(app)
      .get('/pagination?offset=-12')
      .then(res => {
        expect(res.status).toBe(422);
        expect(res.body.status).toBe('error');
      });
  });
  test('GET /sort?field=title', () => {
    return request(app)
      .get('/sort?field=title')
      .then(res => {
        expect(res.status).toBe(200);
        expect(res.body).toBeInstanceOf(Array);
        expect(res.body.length).toBe(15600);
      });
  });
  test('GET /sort?field=nofield should throw 422 error', () => {
    return request(app)
      .get('/sort?field=nofield')
      .then(res => {
        expect(res.status).toBe(422);
        expect(res.body.status).toBe('error');
      });
  });
  test('GET /sort?field=  should throw 422 error', () => {
    return request(app)
      .get('/sort?field=')
      .then(res => {
        expect(res.status).toBe(422);
        expect(res.body.status).toBe('error');
      });
  });
  test('GET /get/:id', () => {
    const id = 2;
    return request(app)
      .get(`/get/${id}`)
      .then(res => {
        expect(res.status).toBe(200);
        expect(res.body[0].id).toBe(id);
      });
  });
  test('GET /get/:id should return 404 for not existing id', () => {
    const id = 11111111111111111111111;
    return request(app)
      .get(`/get/${id}`)
      .then(res => {
        expect(res.body.length).toBe(0);
      });
  });
});
