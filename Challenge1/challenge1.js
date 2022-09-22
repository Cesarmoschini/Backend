class User {
    name;
    lastname;
    pet;
    book;
    countPet;
    title;
    constructor(name,lastname, pet=[],book=[]){
        this.name = name;
        this.lastname = lastname;
        this.pet = pet;
        this.countPet = pet.length;
        this.book = book;
    }

    getFullName(){
        console.log(`Su nombre completo es ${this.name} ${this.lastname}`)
    };
    addPet(){
        this.pet.push()
        console.log(this.pet)
    };
    numberPet(){
        console.log(`El usuario tiene ${this.countPet} tipos de mascotas`)
    };
    arrayBook(){
        console.log(this.book)
    };
    arrayTitleBook(){
        const titleBook = this.book.map((object)=>object.title)
        console.log(titleBook)
    };
}
const user1 = new User('Juan','Rosales',['Cat','Dog'],[{title:'Cien año de soledad',author:'García Marquez'},{title:'Corazón delator',author:'Poe'}]) ;
user1.getFullName();
user1.addPet();
user1.numberPet();
user1.arrayBook();
user1.arrayTitleBook();


