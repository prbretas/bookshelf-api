const express = require('express');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.json());

let nextBookId = 4;

const allowedStatuses = ['unread', 'reading', 'finished'];
const allowedCategories = [
 'software',
 'architecture',
 'data',
 'career'
];

let books = [
 {
   id: 1,
   title: 'Clean Code',
   author: 'Robert C. Martin',
   category: 'software',
   status: 'reading',
   rating: 5,
   createdAt: '2026-05-01T10:00:00.000Z'
 },
 {
   id: 2,
   title: 'The Pragmatic Programmer',
   author: 'Andrew Hunt and David Thomas',
   category: 'software',
   status: 'unread',
   rating: 4,
   createdAt: '2026-05-02T14:30:00.000Z'
 },
 {
   id: 3,
   title: 'Designing Data-Intensive Applications',
   author: 'Martin Kleppmann',
   category: 'architecture',
   status: 'finished',
   rating: 5,
   createdAt: '2026-05-03T09:15:00.000Z'
 }
];

function isNonEmptyString(value) {
 return typeof value === 'string' && value.trim().length > 0;
}

function findBookById(id) {
 return books.find((book) => book.id === Number(id));
}

app.get('/health', (req, res) => {
 return res.status(200).json({
   status: 'ok',
   service: 'bookshelf-api'
 });
});

app.get('/books', (req, res) => {
 const { status, category } = req.query;

 if (status && !allowedStatuses.includes(status)) {
   return res.status(400).json({
     error: 'Status inválido'
   });
 }

 if (category && !allowedCategories.includes(category)) {
   return res.status(400).json({
     error: 'Categoria inválida'
   });
 }

 let filteredBooks = books;

 if (status) {
   filteredBooks = filteredBooks.filter((book) => book.status === status);
 }

 if (category) {
   filteredBooks = filteredBooks.filter((book) => book.category === category);
 }

 return res.status(200).json(filteredBooks);
});

app.post('/books', (req, res) => {
 const { title, author, category, status, rating } = req.body;

 if (!isNonEmptyString(title)) {
   return res.status(400).json({
     error: 'Campo obrigatório: title'
   });
 }

 if (!isNonEmptyString(author)) {
   return res.status(400).json({
     error: 'Campo obrigatório: author'
   });
 }

 if (!allowedCategories.includes(category)) {
   return res.status(400).json({
     error: 'Categoria inválida'
   });
 }

 if (!allowedStatuses.includes(status)) {
   return res.status(400).json({
     error: 'Status inválido'
   });
 }

 const newBook = {
   id: nextBookId,
   title,
   author,
   category,
   status,
   rating: rating || 0,
   createdAt: new Date().toISOString()
 };

 nextBookId += 1;
 books.push(newBook);

 return res.status(201).json(newBook);
});

app.get('/books/:id', (req, res) => {
 const book = findBookById(req.params.id);

 if (!book) {
   return res.status(404).json({
     error: 'Livro não encontrado'
   });
 }

 return res.status(200).json(book);
});

app.patch('/books/:id/status', (req, res) => {
 const book = findBookById(req.params.id);

 if (!book) {
   return res.status(404).json({
     error: 'Livro não encontrado'
   });
 }

 const { status } = req.body;

 if (!allowedStatuses.includes(status)) {
   return res.status(400).json({
     error: 'Status inválido'
   });
 }

 book.status = status;

 return res.status(200).json(book);
});

app.delete('/books/:id', (req, res) => {
 const book = findBookById(req.params.id);

 if (!book) {
   return res.status(404).json({
     error: 'Livro não encontrado'
   });
 }

 if (book.status === 'reading') {
   return res.status(409).json({
     error: 'Livro em leitura não pode ser removido diretamente'
   });
 }

 books = books.filter((item) => item.id !== book.id);

 return res.status(204).send();
});

app.get('/metrics', (req, res) => {
 const metrics = {
   totalBooks: books.length,
   booksByStatus: allowedStatuses.reduce((accumulator, status) => {
     accumulator[status] = books.filter((book) => book.status === status).length;

     return accumulator;
   }, {}),
   booksByCategory: allowedCategories.reduce((accumulator, category) => {
     accumulator[category] = books.filter((book) => book.category === category).length;

     return accumulator;
   }, {}),
   averageRating:
     books.length === 0
       ? 0
       : Number(
           (
             books.reduce((total, book) => total + book.rating, 0) / books.length
           ).toFixed(2)
         )
 };

 return res.status(200).json(metrics);
});

module.exports = app;
