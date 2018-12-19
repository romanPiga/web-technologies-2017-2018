//import movies from './movies';
import { constants } from '../services/constants';
import { db, Movies } from '../db';
import Sequelize from 'sequelize';

const Op = Sequelize.Op;

async function getAll() {
  return await db.sync().then(() => Movies.findAll());
}

async function getByTitle(q) {
  return await db.sync().then(() => {
    return Movies.findAll({
      where: {
        title: {
          [Op.iLike]: '%' + q + '%'
        }
      }
    });
  });
}

async function getPaginated(
  offset = constants.pagination.defaultOffset,
  limit = constants.pagination.defaultLimit
) {
  return await db.sync().then(() => {
    return Movies.findAll({
      offset: offset,
      limit: limit
    });
  });
}

async function getSorted(
  field = constant.defaultField,
  order = constants.sort.up
) {
  return await db.sync().then(() => {
    return Movies.findAll({
      order: [[field, order]]
    });
  });
}

async function getById(id) {
  return await db.sync().then(() => {
    return Movies.findByPk(id);
  });
}

export { getAll, getByTitle, getPaginated, getSorted, getById };
