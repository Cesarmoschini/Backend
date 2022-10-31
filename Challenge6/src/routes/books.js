const express = require('express');
const { BooksController } = require('../controller/books');
const { validarAdmin } = require('../middlewares/function1');
const { socketEmit } = require('../services/socket');
const router = express.Router();

router.get('/', validarAdmin, async (req, res) => {
  console.log('LLEGO REQUEST GET PRODUCTOS');
  const books = await BooksController.getAll();
  res.json({
    data: books,
  });
});

router.get('/:id', async (req, res) => {
  const { id } = req.params; //const id = req.params.id

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
  console.log(req.body);
  const { author, title } = req.body;

  if (!title || !author)
    return res.status(400).json({
      msg: 'Need title and author',
    });

  const newBook = {
    title,
    author,
  };

  const result = await BooksController.save(newBook);

  socketEmit('book', result);

  res.json({ msg: newBook });
});

router.put('/:id', async (req, res) => {
  const { title, author } = req.body;
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
  };

  const result = await BooksController.Update(id, newBook);

  res.json({
    data: result,
  });
});

router.delete('/:id', async (req, res) => {
  const { id } = req.params;

  await BooksController.deleteById(id);
  res.json({
    msg: 'Ok',
  });
});

module.exports = router;