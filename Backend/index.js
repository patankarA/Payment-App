const express = require('express');

const cors = require('cors');//to handle cors error

const mainRouter = require('./routes/index');

const app = express();

app.use(cors());

app.use(express.json());//for json object

app.use("/api/v1", mainRouter);

app.listen(3000);