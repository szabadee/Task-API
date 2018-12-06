const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const tasks = require('./controllers/tasks');
const users = require('./controllers/users');

app.use(bodyParser.urlencoded({ extended: false }));

app.use('/tasks', tasks);
app.use('/users', users);

app.listen(3002, () => {
  console.log('Run on 3002');
});

// app.listen(process.env.PORT);
