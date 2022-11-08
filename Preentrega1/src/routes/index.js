const express = require('express');
const booksRouter = require('./books');
const cartRouter = require('./cart')

const router = express.Router();

router.use('/books', booksRouter)

router.use('/carts', cartRouter)

module.exports =  router;