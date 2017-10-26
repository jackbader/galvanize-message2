'use strict';
const knex= require('../knex')
const express = require('express');

const router = express.Router();


router.get('/', function (req, res, next) {
knex('messages')
.select(
  'id',
  'name',
  'message'
)
.then(function(data){
  res.send(data)
})
})

router.get('/:id', function (req, res, next) {
  const id = Number(req.params.id)
  knex('messages')
  .where('id', id)
  .select(
    'id',
    'name',
    'message'
  )
  .first()
  .then(function(data){
    res.send(data)
  })
})

router.post('/', function (req, res, next) {
  console.log('test')

  console.log('body', req.body);
  knex('messages')
  .insert({
    name: req.body.name,
    message: req.body.message
  }, '*')
  .then(function(data){
    let newObj= {
      name: data[0].name,
      message: data[0].message
    }
    res.send(newObj)
  })
})

router.patch('/:id', function (req, res, next) {
  const id = Number(req.params.id)
  const { name, message } = req.body
  knex('messages')
  .where('id', id)
  .update(req.body)
  .returning('*')
  .then(function(data){
    let updatedObj={
      'id': data[0].id,
    'name': data[0].name,
    'message': data[0].message
  }
  res.send(updatedObj)
  })
})

router.delete('/:id', function (req, res, next) {
  const id = Number(req.params.id)
  knex('messages')
  .where('id', id)
  .del()
  .returning('*')
  .then(function(data){
    let delObj={
      'id': data[0].id,
    'name': data[0].name,
    'message': data[0].message
    }
    res.send(delObj)
  })
})


module.exports = router;
