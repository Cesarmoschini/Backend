const express = require('express');
const BooksRouter = require('./books');
const router = express();

router.use('/books', BooksRouter);

module.exports = router;