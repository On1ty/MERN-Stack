const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const HealthRouter = require("./routes/health");

require("dotenv").config();

const app = express();
const port = process.env.PORT || 5000;

//Middleware

app.use(cors());
app.use(express.json());

//MongoDb Connection
const uri = process.env.ATLAS_URI;
mongoose.connect(uri, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
});

const connection = mongoose.connection;
connection.once("open", () =>
  console.log("MongoDb database connection is established.")
);

app.use("/health", HealthRouter);

app.listen(port, () => console.log("Listening on port: ", port));
