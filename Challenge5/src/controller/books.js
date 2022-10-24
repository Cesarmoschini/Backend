const { v4: uuidv4 } = require('uuid');

class Books {
  constructor() {
    this.books = [
        { id: uuidv4(), title: 'Don Quijote de la Mancha', author: 'Cervantes', year: 1637 },
        { id: uuidv4(), title: 'Ceremonia Secreta', author: 'Denevi', year: 1972 },
        { id: uuidv4(), title: 'El amor y otros demonios', author: 'García Márquez', year: 1978 },
        { id: uuidv4(), title: 'Rosaura a las diez', author: 'Denevi', year: 1987 }
    ];
  }

  getAll() {
    return this.books;
  }

  save(data) {
    const newBook = {
      id: uuidv4(),
      nombre: data.title,
      apellido: data.author,
      edad: data.year,
    };
    this.books.push(newBook);
  }
}

const booksController = new Books();

module.exports = booksController