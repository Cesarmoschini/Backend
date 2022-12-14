import express from 'express';
import cookieParser from 'cookie-parser';
import session from 'express-session';
import mainRouter from '../routes';
import MongoStore from 'connect-mongo';
import config from '../config';

const ttlSeconds = 180;

const StoreOptions = {
  store: MongoStore.create({
    mongoUrl: config.MONGO_ATLAS_URL,
    crypto: {
      secret: 'sq',
    },
  }),
  secret: 'sh',
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: ttlSeconds * 1000,
  },
};

const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(session(StoreOptions));

app.use('/api', mainRouter);

export default app;