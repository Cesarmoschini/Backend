const express = require('express');
const { BooksController } = require('../controller/books');
const { socketEmit } = require('../services/socket');
const router = express.Router();
const Config = require('../config')

router.get('/', async (req, res) => {
  const books = await BooksController.getAll();
  res.json({
    data: books,
  });
});

router.get('/:id', async (req, res) => {
  const { id } = req.params;
  const book = await BooksController.getById(id);

  if (!book)
    return res.status(404).json({
      msg: 'Book not found',
    });

  res.json({
    data: book,
  });
});

router.post('/', async (req, res) => {
  if (!Config.administrator)
  return res.status(401).json({
    msg:"Desautorizado"
  })
  console.log(req.body);
  const { author, title, price, stock } = req.body;

  if (!title || !author)
    return res.status(400).json({
      msg: 'Need title and author',
    });

  const newBook = {
    title,
    author,
    price,
    stock,
  };

  const result = await BooksController.save(newBook);

  socketEmit('book', result);

  res.json({ msg: newBook });
});

router.put('/:id', async (req, res) => {
  if (!Config.administrator)
  return res.status(401).json({
    msg:"Desautorizado"
  })
  const { title, author, price, stock } = req.body;
  const { id } = req.params;

  const book = await BooksController.getById(id);

  if (!book)
    return res.status(404).json({
      msg: 'Book not found',
    });

  if (!title || !author)
    return res.status(400).json({
      msg: 'Need title and author in Body',
    });

  const newBook = {
    title,
    author,
    price,
    stock,
  };

  const result = await BooksController.Update(id, newBook);

  res.json({
    data: result,
  });
});

router.delete('/:id', async (req, res) => {
  if (!Config.administrator)
  return res.status(401).json({
    msg:"Desautorizado"
  })
  const { id } = req.params;
  await BooksController.deleteById(id);
  res.json({
    msg: 'Ok',
  });
});

module.exports = router;