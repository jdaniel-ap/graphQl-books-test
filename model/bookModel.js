const { connection } = require('./connection');


const getAllBooks = async () => {
  const request = await connection().then((db) => 
    db.collection('books').find().toArray());

  return request;
}

const getSingleBook = async (bookId) => {
  const request = await connection().then((db) => 
    db.collection('books').findOne({ id: bookId }));

  return request;
}

const getAllAuthors = async () => {
  const request = await connection().then(db =>
    db.collection('authors').find().toArray());
    console.log(request);
  return request;
}

const getSingleAuthor = async (authorId) => {
  const request = await connection().then((db) => 
    db.collection('authors').findOne({ id: authorId }));

  return request;
}

const getAllBooksFromAuthor = async (authorId) => {
  const request = await connection().then((db) =>
    db.collection('books').find({ authorId: authorId}).toArray());

  return request
}

const addBook = async (data) => {
  const request = await connection().then((db) => {
    db.collection('books').insertOne(data)
  });

}

const addAuthor = async (data) => {
  const request = await connection().then((db) => {
    db.collection('authors').insertOne(data)
  });

}

module.exports = {
  addBook,
  getAllBooks,
  getSingleBook,
  getAllBooksFromAuthor,
  addAuthor,
  getAllAuthors,
  getSingleAuthor,
}
