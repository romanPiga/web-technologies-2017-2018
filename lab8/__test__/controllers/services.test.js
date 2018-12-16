import {
  getAll,
  getByTitle,
  getPaginated,
  getSorted,
  getById
} from '../../server/services';
import { constants } from '../../server/services/constants';
describe('Services tests', () => {
  test('getAll function shuold be defined', () => {
    expect(getAll).toBeDefined();
  });
  test('getByTitle function shuold be defined', () => {
    expect(getByTitle).toBeDefined();
  });
  test('getPaginated function shuold be defined', () => {
    expect(getPaginated).toBeDefined();
  });
  test('getSorted function shuold be defined', () => {
    expect(getSorted).toBeDefined();
  });
  test('getById function shuold be defined', () => {
    expect(getById).toBeDefined();
  });
  test('getAll function should return movies array', () => {
    const movies = getAll();
    expect(movies.length).toBe(15600);
  });
  test('getByTitle function should return matched movies array', () => {
    const data = getByTitle('Ariel');
    expect(data).toBeInstanceOf(Array);
  });
  test('getPaginated function should return a certain amount of movies depending on incoming parameters', () => {
    const data = getPaginated(0, 5);
    expect(data.length).toBe(5);
  });
  test('getSorted function should return movies array in certain order', () => {
    let data = getSorted('id', constants.sort.up);
    expect(data.length).toBe(15600);
    expect(data[0]).toBe('Ariel');
    let desc = getSorted('id', constants.sort.down);
    expect(desc[data.length - 1]).toBe(data[0]);
    data = getSorted('title', constants.sort.up);
    expect(data[0]).toBe('¡Three Amigos!');
    data = getSorted('title', constants.sort.down);
    expect(data[0]).toBe('육체인터뷰');
  });
  test('getById function should return matched movie object', () => {
    const id = 2;
    const data = getById(id);
    expect(data[0]).toBeInstanceOf(Object);
    expect(data[0].id).toBe(id);
  });
  test('getById function should return an empty array for not existing id', () => {
    const data = getById(111111111111111);
    expect(data.length).toBe(0);
  });
});
