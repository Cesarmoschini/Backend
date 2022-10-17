const asyncHandler = require('express-async-handler')
const { Router } = require('express');
const { BooksController } = require('../controller/productos');

const router = Router();

router.get('/', (req, res) => {
	res.json({
		msg: BooksController.getAll()
	})
})

router.get('/:id', (req, res) => {
	const id = req.params.id;

	const book = BooksController.getById(id)
	res.json({
		msg: book
	})
})


router.post('/', async (req, res, next) => {
	const { body }  = req

	try{
		const data = await BooksController.save(body);
		res.json({
			msg: data
		})
	} catch (err) {
		next(err);
	}
})


const funcionAsync = async (req, res) => {
	const id = req.params.id;
	const { body }  = req

	const data = await BooksController.findByIdAndUpdate(id, body);
	res.json({
		msg: data
	})
}

router.put('/:id', asyncHandler(funcionAsync));

router.delete('/:id', (req, res) => {
	const id = req.params.id;

	res.json({
		msg: BooksController.findByIdAndDelete(id)
	})
})

module.exports = router;