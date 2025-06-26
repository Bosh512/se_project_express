const express = require("express");
const mongoose = require("mongoose");
// const indexRouter = require("./routes/index");
const userRouter = require("./routes/users");
const itemRouter = require("./routes/clothingItem");
const routes = require("./routes");

const app = express();
const { PORT = 3001 } = process.env;

mongoose
  .connect("mongodb://127.0.0.1:27017/wtwr_db")
  .then(() => {
    console.log("Mongoose connected to the DB");
  })
  .catch(console.error);

app.use((req, res, next) => {
  req.user = {
    _id: "5d8b8592978f8bd833ca8133",
  };
  next();
});

app.use(express.json());
app.use("/users", userRouter);
app.use("/items", itemRouter);
app.use(routes);

app.listen(PORT, () => {
  console.log("Server listening on port 3001");
});
