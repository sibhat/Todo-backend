const bcrypt = require('bcryptjs');
const db = require('../config/knex');
const jwt = require('jsonwebtoken');

module.exports = {
    error: (error, req, res, next) => {
        res.status(error.status || 500).json(error.message || "request couldn't be found")
    },
    tokenGenerator: user => {
        const {
            id,
            email
        } = user;
        const token = jwt.sign({
            id,
            email
        }, process.env.JWTKEY);
        return token;
    },
    register: (req, res, next) => {
        const newUser = req.body;
        if (!newUser.email && !newUser.password)  next({message: 'email and password is required'})
        newUser.password = bcrypt.hashSync(newUser.password, 14);

        db('users').insert(newUser).returning(["id", "email"])
        .then(result => {
            let token = module.exports.tokenGenerator(result);
            res.status(200).json({token});
        }).catch(error => next({message: error.message, status: 401}))

    },
    signIn: (req, res, next) => {
        const newUser = req.body;
        if (!newUser.email && !newUser.password) next({message: 'username and/or password is required'})

        db('users').where({email: newUser.email})
        .first().then(result => {
        // check if the user has signed up
            if (!result) next({message: 'User has not signed up'});
            // authenticate user
            if (bcrypt.compareSync(newUser.password, result.password)) {
                const token = module.exports.tokenGenerator(result);
                res.status(200).json({token})
            } else {
                next({message: 'incorrect password'})
            }
        }).catch(() => next({message:"Database failed, Please try again"}))
    },
};