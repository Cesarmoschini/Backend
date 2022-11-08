const fs = require('fs');
const { v4: uuidv4 } = require('uuid');

class Cart {
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
    const cart = await this.getData();
    let id;

    const newCart = {
      id: uuidv4(),
      productId: myObject.productId,
      amount: myObject.amount,
    };

    cart.push(newCart);

    await this.saveData(cart);

    return newCart;
  }

  async getById(number) {
    const cart = await this.getData();

    const index = cart.findIndex((aCart) => {
      if (aCart.id === number) return true;
      else return false;
    });

    if (index === -1) return null;

    return cart[index];
  }

  async getAll() {
    const cart = await this.getData();

    return cart;
  }

  async deleteById(number) {
    const cart = await this.getData();

    const newArray = cart.filter(
      (aCart) => aCart.id != number
    );

    await this.saveData(newArray);
  }

  async deleteAll() {
    const newC = [];

    await this.saveData(newC);
  }

  async Update(id, newData) {
    const cart = await this.getAll();

    const index = cart.findIndex((aCart) => aCart.id === id);

    if (index < 0) throw new Error('Book do not exist');

    const cartUpdated = {
      id,
      ...newData,
    };

    books.splice(index, 1, cartUpdated);

    await this.saveData(cart);

    return cartUpdated;
  }
}

const cartController = new Cart();

module.exports = {
    cartController: cartController,
};