const express = require('express');
const router = express.Router();
const knex = require('../db/knex')

/* This router is mounted at http://localhost:3000/todo */
router.get('/', (req, res) => {
    knex('todo')
        .select()
        .then(todos => {
            res.render('all', { todos: todos });
        })
});

router.get('/new', (req, res, next) => {
    res.render('new');
});

module.exports = router;
