const express = require("express");
const app = new express();

const morgan = require("morgan");
app.use(morgan("dev"));

const api = require("./routes/sample");

require('dotenv').config();
const PORT = process.env.PORT;

app.use("/api", api);

app.listen(PORT, () => {
  console.log(`Server is running `);
});