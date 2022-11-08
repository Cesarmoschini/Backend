const express = require('express');
const http = require('http');
const path = require('path');
const mainRouter = require('../routes');
const { engine } = require('express-handlebars');
const { initWsServer } = require('./socket');
const app = express();

const myHttpServer = http.Server(app);
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const layoutDirPath = path.resolve(__dirname, '../../views/layout');

const defaultLayerPth = path.resolve(
  __dirname,
  '../../views/layout/index.hbs'
);

const partialDirPath = path.resolve(__dirname, '../../views/partial');

app.set('view engine', 'hbs');

app.engine(
  'hbs',
  engine({
    layoutsDir: layoutDirPath,
    extname: 'hbs',
    defaultLayout: defaultLayerPth,
    partialsDir: partialDirPath,
  })
);

initWsServer(myHttpServer);

app.use('/api', mainRouter);

app.get('/', async (req, res) => {
  res.render('main');
});
module.exports = myHttpServer;