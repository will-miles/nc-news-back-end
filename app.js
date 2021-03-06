const express = require('express');
const app = express();
const apiRouter = require('./routes/api-router');
const {
  handleCustomErrors,
  handle400Errors,
  handle404Errors,
  handleServerErrors
} = require('./errors/index');
const cors = require('cors');

app.use(cors());
app.use(express.json());

app.use('/api', apiRouter);
app.all('/api', (req, res, next) =>
  next({ status: 405, msg: 'Method not allowed' })
);

app.use('/*', (req, res, next) =>
  res.status(404).send({ msg: 'Route not found' })
);

app.use(handleCustomErrors);
app.use(handle400Errors);
app.use(handle404Errors);
app.use(handleServerErrors);

module.exports = app;
