const express = require('express');
const users = express();
const models = require('../models');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


// create
users.post('/', (req, res) => {
  models.User.findOne({ where: { username: req.body.username } })
    .then(user => {
      if (user) {
        return res.status(400).send('Invalid username');
      }
      bcrypt.hash(req.body.password, 10)
        .then(hash => {
          req.body.encryptedPassword = hash;
          models.User.create(req.body)
            .then(user => {
              res.json(user);
            });
        });
    });
});

  users.post('/login', (req, res) => {
    models.User.findOne({
      where: { username: req.body.username }
    }).then(user => {
      if (!user) {
        return res.status(400).send('Invalid User')
      }
      bcrypt.compare(req.body.password, user.encryptedPassword)
        .then(isValid => {
          if (!isValid) {
            return res.status(401).send('Invalid password');
          }
          const token = jwt.sign({ id: user.id }, process.env.SECRET, { expiresIn: '1h' }).toString();
          res.json({ token: token });
        });
    });
  });

  users.get('/me', (req, res) => {
    res.json(req.user);
  });

  users.put('/me', (req, res) => {
    req.user.update(req.body)
      .then(user => {
        res.json(user);
      });
  });


  module.exports = users;