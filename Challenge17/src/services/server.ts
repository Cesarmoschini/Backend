import express from 'express';
import * as http from 'http';
import mainRouter from '../routes';
import path from 'path';
import { Logger } from './logger';

import { ErrorRequestHandler } from 'express';
const app = express();

const publicPath = path.resolve(__dirname, '../public');
app.use(express.static(publicPath));

app.set('view engine', 'pug');
const viewsPath = path.resolve(__dirname, '../../views');
app.set('views', viewsPath);

app.use(express.json());

app.use('/api', mainRouter);

app.use((req, res) => {
  res.status(404).json({
    msg: 'Ruta no encontrada',
  });
});

const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
  Logger.error(`HUBO UN ERROR ${err.message}`);
  const status = err.statusCode || 500;
  const msg = err.message || 'Internal Server Error';
  const stack = err.stack;
  Logger.error(err);
  res.status(status).send({ msg, stack });
};

app.use(errorHandler);

const HTTPServer = http.createServer(app);

export default HTTPServer;