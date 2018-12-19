import express from 'express';
import routes from './routes';
import config from './config';

const app = express();
app.use(routes);

const port = process.env.PORT || 3000;

const server = app.listen(port, () => {
  console.log(`App listening on port port ${port}`);
});

process.on('SIGTERM', () => {
  console.info('SIGTERM signal received.');
  console.log('Closing http server.');
  server.close(() => {
    console.log('Http server closed.');
  });
});
