const table = document.getElementById('myTable');
const submitButton = document.getElementById('Submit');
const title = document.getElementById('title');
const author = document.getElementById('author');
const price = document.getElementById('price');
const stock = document.getElementById('stock');

async function postData(url = '', data = {}) {
  const response = await fetch(url, {
    method: 'POST',
    mode: 'cors',
    cache: 'no-cache',
    credentials: 'same-origin',
    headers: {
      'Content-Type': 'application/json',
    },
    redirect: 'follow',
    referrerPolicy: 'no-referrer',
    body: JSON.stringify(data),
  });
  return response.json();
}

const socket = io();

socket.emit('allBooks');

socket.on('book', (aBook) => {
  attachRow(aBook);
});

const attachRow = (aBook) => {
  const fila = document.createElement('tr');
  fila.innerHTML = `<td>${aBook.id}</td><td>${aBook.title}</td> <td>${aBook.author}<td>${aBook.price}<td>${aBook.stock}</td>`;

  table.appendChild(fila);
};

submitButton.addEventListener('click', async (e) => {
  e.preventDefault();
  try {
    const data = {
      nombre: title.value,
      author: author.value,
      price: price.value,
      stock:stock.value,
    };

    const url = 'http://localhost:8080/api/books';
    response = await postData(url, data);

    console.log(response);
  } catch (err) {
    console.log(err);
  }
});