const express = require("express");
const morgan = require("morgan");

const dbClient = require("./utils/database");
const booksRouter = require("./resources/books/router");

const app = express();

// MIDDLEWARE

app.use(morgan("dev"));
app.use(express.json());

// ROUTES

app.use("/books", booksRouter);

app.get("*", (req, res) => {
  res.json({ ok: true });
});

// START SERVER

const port = 4000;

app.listen(4000, () => {
  dbClient.connect((error) => {
    if (error) {
      console.error(error);
    } else {
      console.log("Database is connected");
    }
  });
  console.log("App running");
});
