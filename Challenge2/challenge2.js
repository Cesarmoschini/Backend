const fs = require('fs');
const path = require('path');

const nameFile = 'books.json'

const obtainBooks = async () =>{ 
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
    async saveBook(myObject){
        const books = await obtainBooks();
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
        const books = await obtainBooks();
            const index = books.findIndex((aBook) => aBook.id == id)
            if (index == -1) {throw new Error('No existe el libro buscado')}
            console.log(books[index]);
        };
    async getAll(){
        const books = await obtainBooks();
        console.log(books)
    }
    async deleteById(idSelected){
        const books = await obtainBooks();
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

newArchive.getAll(); //Obtiene todos los libros del archivo books.json
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