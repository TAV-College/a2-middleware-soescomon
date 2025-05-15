// Base imports
const express = require("express");
const bodyParser = require("body-parser");
const { routerLogger } = require("./middleware/logger.js");
const { errorHandler } = require("./middleware/errorHandler.js");

// Router Imports
const mainRouter = require("./routers/main.js");
const bookRouter = require("./routers/books.js");
const userRouter = require("./routers/users.router.js");
const port = process.env.PORT || 3000;

// Create & Configure App
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.set("view engine", "ejs");
app.use(routerLogger);

// Load routers
app.use("", mainRouter);
app.use("", bookRouter);
app.use("", userRouter);

app.get("/", (req, res) => {
  res.render("index", { title: "Home" });
});

//404
app.use((req, res) => {
  res.status(404).render("error", {
    title: "404 Not Found",
    msg: "This page was not found.",
  });
});

app.use(errorHandler);
// Run app
app.listen(port, () => {
  console.log(`Example app listening on http://localhost:${port}`);
});
