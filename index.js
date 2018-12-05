const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const tasks = require('./controllers/tasks');

app.use(bodyParser.urlencoded({ extended: false }));

app.use('/tasks', tasks);

app.listen(process.env.PORT);
