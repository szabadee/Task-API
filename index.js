const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const tasks = require('./controllers/tasks');
const users = require('./controllers/users');
const jwt = require('jsonwebtoken');
const models = require('./models');

app.use(bodyParser.urlencoded({ extended: false }));

app.use((req, res, next) => {
  if (req.header('x-auth')) {
    let token = req.header('x-auth');
    console.log(token);
    let decoded;
    try {
      decoded = jwt.verify(token, process.env.SECRET);
    } catch(err) {
      return res.status(401).send(err);
    }
    models.User.findById(decoded.id)
      .then(user => {
        req.user = user;
        next();
      });
  } else {
    next();
  }
});

app.use('/tasks', tasks);
app.use('/users', users);

app.listen(3002, () => {
  console.log('Hello Peet, I am ready and run on 3002');
});

// app.listen(process.env.PORT);
