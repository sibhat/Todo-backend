
const db = require("../config/knex");

module.exports = {
    getAllTodos: (req, res, next) =>{
        db('todos')
            .then(result => {
                res.status(200).json({result});
            }).catch(error => next({message: error.message, status: 401}))
    },
    createToDo: (req, res, next)  =>{
        const newTodo = req.body;
        if (newTodo.title && newTodo.description) {
            db('todos').insert(newTodo)
                .then(result => {
                    res.status(200).json(result);
                }).catch(error => next({message: error.message, status: 401}))
        } else {
            next({message: 'title or description is missing'})
        }
    },

};
