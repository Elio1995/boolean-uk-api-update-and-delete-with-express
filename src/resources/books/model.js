const dbClient = require("../../utils/database");

/* 
  Book has:
        id              SERIAL        
        title           VARCHAR
        type            VARCHAR  
        author          VARCHAR   
        publicationDate  DATE
*/

function book() {
  function createTable() {
    const sql = `
      CREATE TABLE IF NOT EXISTS books(
        id              SERIAL          PRIMARY KEY,   
        title           VARCHAR(255)    NOT NULL, 
        type            VARCHAR(255)    NOT NULL, 
        author          VARCHAR(255)    NOT NULL,
        publicationDate  DATE           NOT NULL
      );
      `;

    dbClient
      .query(sql)
      .then((result) => console.log("Books are readyyyyyy...!!!"))
      .catch(console.error);
  }

  function getAllBooks(callback) {
    const allBooksSql = `
      SELECT * FROM books;
      `;
    dbClient
      .query(allBooksSql)
      .then((result) => callback(result.rows))
      .catch(console.error);
  }

  function createOneBook(newBook, callback) {
    const { title, type, author, publicationDate } = newBook;
    const addOneSql = `
    INSERT INTO books (
        title, type, author, publicationDate
    )
    VALUES ($1, $2, $3, $4)
    RETURNING *;
    `;

    dbClient
      .query(addOneSql, [title, type, author, publicationDate])
      .then((result) => {
        callback(result.rows[0]).catch(console.error);
      });
  }

  function getOneBook(bookId, callback) {
    const getOneSql = `
    SELECT * FROM books
    WHERE id = ($1);
    `;
    dbClient
      .query(getOneSql, [bookId])
      .then((result) => callback(result.rows[0]))
      .catch(console.error);
  }

  function updateOneBookById(req, res) {
    const bookToUpdateId = req.params.id;
    const bookToUpdate = req.body;

    getOneBook(bookToUpdateId, (choosenBook) => {
      const updatedBook = { ...choosenBook, ...bookToUpdate };

      const updateOneBookSql = `
    UPDATE books
    SET title = $1, type = $2, author= $3, publicationDate = $4
    WHERE id = $5
    RETURNING *;
    `;

      dbClient
        .query(updateOneBookSql, [
          updatedBook.title,
          updatedBook.type,
          updatedBook.author,
          updatedBook.publicationDate,
          bookToUpdateId,
        ])
        .then((result) => res.json({ book: result.rows[0] }))
        .catch(console.error);
    });
  }

  createTable();

  return {
    createOneBook,
    getAllBooks,
    getOneBook,
    updateOneBookById,
  };
}

module.exports = book;
