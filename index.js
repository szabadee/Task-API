const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const exphbs = require('express-handlebars');
const morgan = require('morgan');
const Sequelize = require('sequelize');

app.use(bodyParser.urlencoded({ extended: false }));

app.listen(process.env.PORT);
