const express = require('express');
const tasks = express();
const models = require('../models');

// index
tasks.get('/', (req, res) => {
  models.Task.findAll()
  .then(tasks => {
    res.json(tasks);
  });
});

// show by ID
tasks.get('/:id', (req, res) => {
  models.Task.findById(req.params.id)
  .then(task => {
    res.locals.task = task;
    res.json(task);
  }).catch(err => {
    console.error(err);
  });
});

// create
tasks.post('/', (req, res) => {
  models.Task.create({
    name: req.body.name,
    message: req.body.message
  }).then(task => {
    res.json(task);
  }).catch(err => {
    console.error(err);
  });
});

// update
tasks.put('/:id', (req, res) => {
  models.Task.update(req.body,
    { where: { id: req.params.id} })
    .then(task => {
      res.json(task);
    }).catch(err => {
      console.error(err);
    });
});

// delete
tasks.delete('/:id', (req, res) => {
  models.Task.destroy(
    { where: { id: req.params.id } })
    .then(tasks => {
      res.json(tasks);
    }).catch(err => {
      console.error(err);
    });
});

module.exports = tasks;
