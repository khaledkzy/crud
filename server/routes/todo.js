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

router.get('/new', (req, res) => {
    res.render('new');
});

function respondAndRender(id, res, viewName) {
    if (typeof id != 'undefined') {
        knex('todo') // bring the todotable
            .select()
            .where('id', id)
            .first()
            .then(todo => {
                console.log('todo', todo)
                res.render(viewName, todo);
            })
    } else {
        res.status(500)
        res.render('error', {
            message: 'Invalid Todo'
        })
    }
}

router.get('/:id', (req, res) => {
    const id = req.params.id
    respondAndRender(id, res, 'single')
});


router.get('/:id/edit', (req, res) => {
    const id = req.params.id
    respondAndRender(id, res, 'edit')
})


function validTodo(todo) {
    return typeof todo.title == 'string' &&
        todo.title.trim() != '' &&
        typeof todo.priority != 'undefined' &&
        !isNaN(Number(todo.priority))
}

function validateTodoInsertUpdateRedirect(req, res, callback) {
    if (validTodo(req.body)) {
        let todo = {
            title: req.body.title,
            description: req.body.description,
            priority: req.body.priority,
            date: new Date()
        };
        callback(todo)
    } else {
        res.status(500)
        res.render('error', {
            message: 'Invalid Todo'
        })
    }
}
router.post('/', (req, res) => {
    //    console.log(req.body)
    validateTodoInsertUpdateRedirect(req, res, (todo) => {
        knex('todo')
            .insert(todo, 'id')
            .then(ids => {
                const id = ids[0]
                res.redirect(`/todo/${id}`)
            })
    })
});


router.put('/:id', (req, res) => {
    validateTodoInsertUpdateRedirect(req, res, (todo) => {
        knex('todo')
        .where('id', req.params.id)
            .update(todo, 'id')
            .then(ids => {
                const id = ids[0]
                res.redirect(`/todo/${req.params.id}`)
            })
    })
})
module.exports = router;
