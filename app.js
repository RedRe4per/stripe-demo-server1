const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');
const cors = require('cors');
const errorHandler = require('./src/middleware/errorHandler');
const app = express();
require('express-async-errors');
const router = require('./src/routes');

app.use(helmet());
app.use(cors());
app.use('/v1/webhook', express.raw({type: "*/*"}))
app.use(express.json());
app.use(morgan('combined'));
app.use(errorHandler);
app.use('/v1', router);

module.exports = app;