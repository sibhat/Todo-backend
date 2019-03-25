const db = require("../config/knex");

module.exports = {
    getAllTodos: (req, res, next) => {
        const id = req.params.id;
        let query = db('todos');
        if (id) {
            query.where("id", id).first().then(result => {
                res.status(200).json(result);
            }).catch(error => next({message: error.message, status: 401}))
        } else {
            query.then(result => {
                res.status(200).json(result);
            }).catch(error => next({message: error.message, status: 401}))
        }
    },
    createToDo: (req, res, next) => {
        const newTodo = req.body;
        if (newTodo.title && newTodo.description) {
            db('todos').insert(newTodo).returning(["id", "title"])
                .then(result => {
                    res.status(200).json(result);
                }).catch(error => next({message: error.message, status: 401}))
        } else {
            next({message: 'title or description is missing'})
        }
    },
    updateToDo: (req, res, next) => {
        const newTodo = req.body;
        const id = req.params.id;
        if (id) {
            db('todos').where("id", id).first().update(newTodo)
                .then(result => {
                    res.status(200).json(result);
                }).catch(error => next({message: error.message, status: 401}))
        } else {
            next({message: 'id is missing'})
        }
    },
    patchToDo: (req, res, next) => {
        const newTodo = req.body;
        const id = req.params.id;
        if (id) {
            db('todos').where("id", id).first().update(newTodo)
                .then(result => {
                    res.status(200).json(result);
                }).catch(error => next({message: error.message, status: 401}))
        } else {
            next({message: 'id is missing'})
        }
    },
    deleteToDo: (req, res, next) => {
        const id = req.params.id;
        if (id) {
            db('todos').where("id", id).first().del()
                .then(result => {
                    res.status(200).json(result);
                }).catch(error => next({message: error.message, status: 401}))
        } else {
            next({message: 'id is missing'})
        }
    }


};
