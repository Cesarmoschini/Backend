const express = require('express');
const booksController = require('../controller/books');

const router = express.Router();

router.post('/', (req, res) => {
  const body = req.body;

  const newBook = {
    nombre: body.title,
    apellido: body.author,
    edad: body.year,
  };

  booksController.save(newBook);

  res.redirect('/')
});

module.exports = router