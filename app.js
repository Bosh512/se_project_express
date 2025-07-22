const dotenv = require("dotenv");

dotenv.config();
const cors = require("cors");
const express = require("express");
const mongoose = require("mongoose");
const routes = require("./routes");

const app = express();
const { PORT = 3001 } = process.env;

app.use(cors());

// the linter is expecting a hard coded id here but the project says to remove it so it is not present even though this causes an error

mongoose
  .connect("mongodb://127.0.0.1:27017/wtwr_db")
  .then(() => {
    console.log("Mongoose connected to the DB");
  })
  .catch(console.error);

app.use(express.json());
app.use(routes);

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
