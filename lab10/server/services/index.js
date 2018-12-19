//import movies from './movies';
import { constants } from '../services/constants';
import Movie from '../db';

const getAll = res => {
  Movie.find({}).then(movies => {
    res.json(movies)
  });
};

const getByTitle = (q, res) => {
  return Movie.find({ title: new RegExp(q, 'i') }).then(results => {
    return res.json(results.map(item => item.title));
  });
}

const getPaginated = (offset, limit, res) => {
  return Movie.find()
    .limit(limit)
    .skip(offset)
    .then(response => res.json(response.map(item => item.title)))
};

const getSorted = (
  field = constant.defaultField,
  order = constants.sort.up,
  res
) => {
  Movie.find({})
    .sort([[field, order]])
    .then(sorted => res.json(sorted.map(item => item.title)))
};

const getById = (id, res) => {
  Movie.findOne({ id }).then(movie => {
    res.json(movie)
  });
};

export { getAll, getByTitle, getPaginated, getSorted, getById };
