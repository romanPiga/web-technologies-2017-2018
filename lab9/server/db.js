import Sequelize from 'sequelize';
import data from './services/movies.json';

const db = new Sequelize(
    process.env.NAME,
    process.env.LOGIN,
    process.env.PASSWORD,
    {
      host: process.env.HOST,
      dialect: 'mysql'|'sqlite'|'postgres'|'mssql'
    }
);

const Movies = db.define('movies', {
    vote_count: Sequelize.INTEGER,
    id: { type: Sequelize.INTEGER, primaryKey: true },
    video: Sequelize.BOOLEAN,
    vote_average: Sequelize.FLOAT,
    title: Sequelize.STRING,
    popularity: Sequelize.FLOAT,
    poster_path: Sequelize.STRING,
    original_language: Sequelize.STRING,
    original_title: Sequelize.STRING,
    genre_ids: Sequelize.ARRAY(Sequelize.INTEGER),
    backdrop_path: Sequelize.STRING,
    adult: Sequelize.BOOLEAN,
    overview: Sequelize.STRING(1000),
    release_date: Sequelize.STRING
});

db.sync({ force: true}).then(() => {
    data.forEach(movie => Movies.create(movie))
});

export default { db, Movies};