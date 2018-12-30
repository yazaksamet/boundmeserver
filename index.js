const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const mobile = require("./routes/mobile");
const users = require("./routes/users");
const config = require("./config/config");

const app = express();
const nodeEnv = process.env.NODE_ENV || "dev";
console.log(`Running env -> ${nodeEnv}...`);

app.use(cors());
app.use(express.json());
app.get("/", (req, res) => {
  res.send("home");
});

app.use("/api/mobile", mobile);
app.use("/api/users", users);

mongoose.set("useCreateIndex", true);
mongoose
  .connect(
    config.mongoURI,
    { useNewUrlParser: true }
  )
  .then(() => console.log(`Connected mongodb on ${config.mongoURI}...`));

const port = process.env.PORT || config.appPort;
const server = app.listen(port, () => {
  console.log(`Listening on port ${port}...`);
});

module.exports = server;
