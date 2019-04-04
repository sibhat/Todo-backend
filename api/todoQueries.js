const db = require("../config/knex");
const jwt = require("jsonwebtoken");
module.exports = {
    authorizeUser: (req, res, next) => {
        let user_id = req.user_id;
        let todo_id = req.params.id;
        if (!todo_id) next({message: 'id is missing'});
        db('todos').where({id: todo_id}).first()
            .then(result => {
                if (result.user_id === user_id) {
                    next();
                } else {
                    next({message: "User is not authorized", status: 401});
                }
            }).catch(() => {
            next({message: "Item was not found on DB", status: 401})
        })
    },
    verifyUser: (req, res, next) => {
        try {
            let token = req.body.token || req.query.token || req.headers['x-access-token'] || req.headers["Bearer"] || req.headers["authorization"];
            token = token.split(" ")[1];
            jwt.verify(token, process.env.JWTKEY, (err, decoded) => {
                if (err) next({message: 'Failed to authenticate token.', status: 401});
                db('users').where({id: decoded.id}).first()
                    .then(result => {
                        if (result) {
                            req.user_id = decoded.id;
                            next()
                        } else {
                            next({message: "wrong user id", status: 401})
                        }
                    }).catch(() =>  next({message: "user could not be found in DB.", status: 501}))
            });
        } catch (err) {
            next({message: "No token provided.", status: 403})
        }
    },
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
        newTodo.user_id = req.user_id;
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
        db('todos').where("id", id).first().update(newTodo).returning(["id", "title", "description", "date"])
            .then(result => {
                res.status(200).json(result);
            }).catch(error => next({message: error.message, status: 401}))

    },
    patchToDo: (req, res, next) => {
        const newTodo = req.body;
        const id = req.params.id;

        db('todos').where("id", id).first().update(newTodo).returning(["id", "title", "description", "date"])
            .then(result => {
                res.status(200).json(result);
            }).catch(error => next({message: error.message, status: 401}))

    },
    deleteToDo: (req, res, next) => {
        const id = req.params.id;
        db('todos').where("id", id).first().del()
            .then(() => {
                res.status(200).json({id: id});
            }).catch(error => next({message: error.message, status: 401}))
    }
};
