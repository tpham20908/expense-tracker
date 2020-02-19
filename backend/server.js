const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

require("dotenv").config();

const app = express();
const port = process.env.PORT || 5000;

const expensesRouter = require("./routes/expenses");

app.use(cors());
app.use(express.json());

// routing
app.use("/expenses", expensesRouter);

// connect to Mongo Atlas
const uri = process.env.ATLAS_URI;

mongoose.connect(uri, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true
});

const connection = mongoose.connection;
connection.once("open", () => {
  console.log("MongoDB database connected!");
});

// run server
app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
