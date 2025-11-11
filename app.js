const dotenv = require("dotenv");
require("dotenv").config();

dotenv.config();
const cors = require("cors");
const express = require("express");
const mongoose = require("mongoose");
const routes = require("./routes");
const { errorHandler } = require("./middlewares/error-handler");
const app = express();
const { errors } = require("celebrate");
const { requestLogger, errorLogger } = require("./middlewares/logger");
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

app.use(requestLogger);
app.use(routes);

app.use(errorLogger);
app.use(errors());
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
