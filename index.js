const express = require("express");
const morgan = require("morgan");
const router = require("./router")

const app = express();
app.use(morgan('tiny'));
app.use(express.json());

app.use("/files", router);

app.listen(3000, ()=>{
  console.log("Hello! Web server is running")
});