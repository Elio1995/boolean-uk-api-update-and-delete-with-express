const express = require("express");
const book = require("./model");

const booksRouter = express.Router();

const {
  createOneBook,
  getAllBooks,
  getOneBook,
  updateOneBookById,
  deleteOneBookById,
} = book();

booksRouter.get("/", (req, res) => {
  const books = req.body;
  getAllBooks((result) => {
    res.json({ result });
  });
});

booksRouter.get("/:id", (req, res) => {
  const { id } = req.params;
  getOneBook(Number(id), (bookItem) => {
    res.json({ bookItem });
  });
});

booksRouter.post("/", (req, res) => {
  const newBook = req.body;
  createOneBook(newBook, (bookItem) => {
    res.json({ book: bookItem });
  });
});

booksRouter.patch("/:id", updateOneBookById);

booksRouter.delete("/:id", deleteOneBookById);

module.exports = booksRouter;
