const { Router } = require('express');
const BooksRouter = require('./productos');

const router = Router();

router.get('/', (req, res) => {
	res.json({
		msg: 'ok router'
	})
})

router.use('/books', BooksRouter);

module.exports = router;