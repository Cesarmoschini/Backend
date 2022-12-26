const fs = require('fs');
const path = require('path');
const express = require('express');
const app = express();
const PORT = 8080;
const nameFile = 'books.json'


const getBooks = async () =>{ 
    const data = await fs.promises.readFile(nameFile,'utf-8');
    return JSON.parse(data);
}

const saveBooks = async (books) =>{
    const data = JSON.stringify(books,null,'\t');
    await fs.promises.writeFile(nameFile,data)  
}

class Contenedor{
    constructor(nameFile){
        this.nameFile = path.resolve(__dirname, nameFile);
    };
    // async getBooks(){
    // try{
    //     await fs.promises.readFile(nameFile,'utf-8');
    //     return JSON.parse(data);
    // }catch (error){
    //     throw new Error(`Error de lectura ${error}`)
    // }
    // };
    // async saveBooks(books){
    // try{
    //     await JSON.stringify(books,null,'\t');
    //     await fs.promises.writeFile(nameFile,data)  
    // }catch (error){
    //     throw new Error(`Error de lectura ${error}`)
    // }
    // };
    async saveBook(myObject){
        const books = await getBooks();
        let id;
        if (books.length === 0) id = 1;
        else id = books[books.length - 1].id + 1;
        const newBook = {
            title: myObject.title,
            author: myObject.author,
            id: id,
        };
        books.push(newBook);
        await saveBooks(books);
        console.log(books)
    }
    async getById(id){
        const books = await getBooks();
            const index = books.findIndex((aBook) => aBook.id == id)
            if (index == -1) {throw new Error('No existe el libro buscado')}
            return books[index];
        };
    async getAll(){
        const books = await getBooks();
        return books
    }
    async deleteById(idSelected){
        const books = await getBooks();
        const newBooks = books.filter(
          (aBook) => aBook.id != idSelected
        );
        await saveBooks(newBooks);
        console.log(books)
    };
    async deleteAll(nameFile){
        const newFile = [];
        await fs.promises.writeFile(this.nameFile, JSON.stringify(nameFile, null, '\t'));
        console.log(books)
    };
}

const newArchive = new Contenedor('books.json')

app.get('/productos', async (req, res) => {
    const products = await newArchive.getAll();
    res.json(products);
});

app.get('/productoRandom', async (req, res) => {
    const between = (min, max) => {
        return Math.floor(Math.random() * (max - min) + min);
    };
    const books = await getBooks();
    const valor = books.length;
    const product = await newArchive.getById(between(1,valor));
    res.json(product)
});

const server = app.listen(PORT, ()=>{
    console.log(`Servidor http escuchando en el port ${server.address().port}`)
});

server.on('error',error => console.log(`error en el servidor${error}`));

// newArchive.getAll(); //Obtiene todos los libros del archivo books.json
// newArchive.saveBook({title: 'Pedro Páramo', author: 'Rulfo'}); //Guarda un nuevo libro en el archivo books.json
// newArchive.getById(2); //Obtiene el libro con el id elegido (2) desde el archivo books.json
// newArchive.deleteById(2); //Elimina el libro con el id elegido (2) desde el archivo books.json
// newArchive.deleteAll([]); //Elimina todos los libros del archivo books.json

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