const fs = require('fs');
const { v4: uuidv4 } = require('uuid');

class Books {
  constructor(nameFile) {
    this.file = nameFile;
  }

  async getData() {
    const data = await fs.promises.readFile(this.file, 'utf-8'); //data = '[]'
    return JSON.parse(data);
  }

  async saveData(data) {
    await fs.promises.writeFile(this.file, JSON.stringify(data, null, '\t'));
  }

  async save(myObject) {
    const books = await this.getData();
    let id;

    const newBook = {
      id: uuidv4(),
      title: myObject.title,
      author: myObject.author,
    };

    books.push(newBook);

    await this.saveData(books);

    return newBook;
  }

  async getById(number) {
    const books = await this.getData();

    const index = books.findIndex((aBook) => {
      if (aBook.id === number) return true;
      else return false;
    });

    if (index === -1) return null;

    return books[index];
  }

  async getAll() {
    const books = await this.getData();

    return books;
  }

  async deleteById(number) {
    const books = await this.getData();

    const newArray = books.filter(
      (aBook) => aBook.id != number
    );

    await this.saveData(newArray);
  }

  async deleteAll() {
    const newB = [];

    await this.saveData(newB);
  }

  async Update(id, newData) {
    const books = await this.getAll();

    const index = books.findIndex((aBook) => aBook.id === id);

    if (index < 0) throw new Error('Book do not exist');

    const productUpdated = {
      id,
      ...newData,
    };

    books.splice(index, 1, productUpdated);

    await this.saveData(books);

    return productUpdated;
  }
}

const BooksController = new Books();

module.exports = {
    BooksController: BooksController,
};