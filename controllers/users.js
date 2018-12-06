const express = require('express');
const users = express();
const models = require('../models');
const bcrypt = require('bcrypt');


// create
users.post('/', (req, res) => {
  bcrypt.hash(req.body.password, 10)
    .then(hash => {
      req.body.encryptedPassword = hash;
      models.User.create(req.body)
        .then(user => {
          res.json(user);
        });
    });  
});


module.exports = users;