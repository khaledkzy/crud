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

router.get('/new', (req, res    ) => {
    res.render('new');
});

router.get('/:id', (req, res) => {
    const id = req.params.id
    if (typeof id != 'undefined') {
        knex('todo')
            .select()
            .where('id', id)
            .first()
            .then(todo => {
                console.log('todo', todo)
                res.render('single', todo);
            })
    } else {
        res.status(500)
        res.render('error', {
            message: 'Invalid Todo'
        })
    }

});





function validTodo(todo) {
    return typeof todo.title == 'string' &&
        todo.title.trim() != '' &&
        typeof todo.priority != 'undefined' &&
        !isNaN(Number(todo.priority))
}


router.post('/', (req, res) => {
    console.log(req.body)
    if (validTodo(req.body)) {
        let todo = {
            title: req.body.title,
            description: req.body.description,
            priority: req.body.priority,
            date: new Date()
        };
        //insert into database
        knex('todo')
            .insert(todo, 'id')
            .then(ids => {
                const id = ids[0]
                res.redirect(`/todo/${id}`)
            })
    } else {
        res.status(500)
        res.render('error', {
            message: 'Invalid Todo'
        })
    }
});

module.exports = router;
