const express = require('express');
const path = require('path');
const mainRouter = require('../routes/index');
const booksController = require('../controller/books');
const app = express();

app.use(express.static('public'));

app.set('view engine', 'ejs');
const viewsPath = path.resolve(__dirname, '../../views');
app.set('views', viewsPath);

app.get('/', (req, res) => {
  const books = booksController.getAll();
  res.render('index', { books });
});

app.use(express.json());	//permite json
app.use(express.urlencoded({ extended: true }));  //permite form data

app.use('/api', mainRouter);

module.exports = app;