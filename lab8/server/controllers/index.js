import movies from '../services/movies';
import { constants } from '../services/constants';
import Joi from 'joi';
import {
  getAll,
  getByTitle,
  getPaginated,
  getSorted,
  getById
} from '../services';

const all = (req, res) => {
  res.send(getAll());
};

const search = (req, res) => {
  let schema = Joi.object().keys({
    q: Joi.string().required()
  });
  Joi.validate(req.query, schema, (err, success) => {
    if (err) {
      res.status(422).json({
        status: 'error',
        message: 'Missed search parameter'
      });
    } else {
      res.send(getByTitle(success.q));
    }
  });
};

const pagination = (req, res) => {
  let schema = Joi.object().keys({
    offset: Joi.number()
      .max(movies.length)
      .min(0)
      .default(constants.pagination.defaultOffset),
    limit: Joi.number()
      .min(1)
      .default(constants.pagination.defaultLimit)
  });
  Joi.validate(req.query, schema, (err, success) => {
    if (err) {
      res.status(422).json({
        status: 'error',
        message: 'Invalid query parameters'
      });
    } else {
      res.send(getPaginated(success.offset, success.limit));
    }
  });
};

const sort = (req, res) => {
  let schema = Joi.object().keys({
    field: Joi.string().default(constants.sort.defaultField),
    order: Joi.string().default(constants.sort.up)
  });
  Joi.validate(req.query, schema, (err, success) => {
    if (err) {
      res.status(422).json({
        status: 'error',
        message: 'Missed sort field'
      });
    } else if (!movies[0].hasOwnProperty(success.field)) {
      res.status(422).json({
        status: 'error',
        message: 'Invalid sort field'
      });
    } else {
      let { field, order } = success;
      res.send(getSorted(field, order));
    }
  });
};

const get = (req, res) => {
  let schema = Joi.object().keys({
    id: Joi.number()
  });
  Joi.validate(req.params, schema, (err, success) => {
    if (err) {
      res.status(422).json({
        status: 'error',
        message: 'Wrong id'
      });
    } else {
      let { id } = success;
      res.send(getById(id));
    }
  });
};

export const controllers = {
  all,
  search,
  pagination,
  sort,
  get
};
