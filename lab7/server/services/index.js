import movies from './movies';
import { constants } from '../services/constants';

const getAll = () => movies.map(item => item.title);

const getByTitle = q =>
  movies.filter(item => item.title.toLowerCase().includes(q.toLowerCase()));

const getPaginated = (offset, limit) =>
  movies.slice(offset, offset + limit).map(item => item.title);

const getSorted = (
  field = constant.defaultField,
  order = constants.sort.up
) => {
  let data = movies.slice().sort((a, b) => {
    if (typeof a[field] != 'number')
      return order == constants.sort.up
        ? a[field].localeCompare(b[field])
        : b[field].localeCompare(a[field]);
    else
      return order == constants.sort.down
        ? b[field] - a[field]
        : a[field] - b[field];
  });
  return data.map(item => item.title);
};

const getById = id => movies.filter(item => item.id == id);

export { getAll, getByTitle, getPaginated, getSorted, getById };
