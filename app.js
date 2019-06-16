const express = require('express');
const bodyparser = require('body-parser');

const app = express();

app.use(bodyparser.json({}));
app.use(bodyparser.urlencoded({ extended: false}));

const trainRouter = require('./router/train_router');
app.use(trainRouter);

module.exports = app;