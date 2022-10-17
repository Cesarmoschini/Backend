const createError = require('http-errors')
const { v4: uuidv4 } = require('uuid');

class BooksAPI {
	constructor () {
		this.books = [
			{ id: '81d44171-6a3c-4661-b6d1-2a2a75a4d5f2', title: 'Don Quijote de la Mancha', author: 'Cervantes' },
			{ id: 'c965d506-e2e7-4f1e-ac92-6f15946feaac', title: 'Ceremonia Secreta', author: 'Denevi' },
			{ id: '1ffa7474-8c62-4f6e-b1d7-310cecb3ea2f', title: 'El amor y otros demonios', author: 'García Márquez' },
			{ id: '33460c45-796f-4dc0-9c0a-37135862b3b2', title: 'Rosaura a las diez', author: 'Denevi' }
		];
	}

	exists(id) {

		const index = this.books.findIndex(aBook =>  aBook.id == id)

		console.log(index);
		return index >= 0;
	}

	validateBody(data) {
		if(!data.title || !data.author || typeof data.title !== 'string' || typeof data.author !== 'string') throw createError(400,'Datos invalidos');
	}

	getAll() {
		return this.books;
	}


	getById(id) {
		const exist = this.exists(id);


		if(!exist) throw createError(404, 'El producto no existe');

		const index = this.books.findIndex(aBook =>  aBook.id == id)

		return this.books[index];
	}

	save(data) {

		const newBook = {
			title: data.title,
			author: data.author,
			id: uuidv4()
		}

		this.books.push(newBook);
		return newBook;
	}

	findByIdAndUpdate(id, datanew) {
		const exist = this.exists(id);

		if(!exist) throw createError(404, 'El producto no existe');

		const index = this.books.findIndex(aBook =>  aBook.id == id)

		const oldBook =  this.books[index];

		const newBook = {
			id: oldBook.id,
			title: datanew.title,
			price: datanew.price
		}

		this.books.splice(index, 1, newBook);

		return newBook;
	}

	findByIdAndDelete(id) {
		const exist = this.exists(id);
		if(!exist) return;

		const index = this.books.findIndex(aBook =>  aBook.id == id)

		this.books.splice(index, 1);
	}

	random() {
		return new Promise((resolve, reject) => {
			setTimeout(() => {
				reject(createError(404, 'El producto no existe'))
			}, 500)
		})
	}

}

const instanceBooksApi = new BooksAPI();

module.exports = {
	BooksController : instanceBooksApi
}

//ARRAY ORIGINAL DEL ARCHIVO books.json
// [
// 	{
// 		"title": "Cien años de soledad",
// 		"author": "García Márquez",
// 		"id": 1
// 	},
// 	{
// 		"title": "Ceremonia secreta",
// 		"author": "Denevi",
// 		"id": 2
// 	},
// 	{
// 		"title": "Amor y otros demonios",
// 		"author": "García Márquez",
// 		"id": 3
// 	},
// 	{
// 		"title": "Casa de muñecas",
// 		"author": "Ibsen",
// 		"id": 4
// 	}
// ]