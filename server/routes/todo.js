var express = require('express');
var router = express.Router();
const knex = require('../db/knex')

/* This router is mounted at http://localhost:3000/todo */
router.get('/', function (req, res, next) {
    knex('todo')
        .select()
        .then(todos => {
            res.render('all', { todos: todos });
        })

});

module.exports = router;
