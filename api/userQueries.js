const knex = require("../config/knex");
module.exports = {
    me: (req, res, next) =>{
        knex('users').where("id", req.user_id).first()
            .then(result =>{
                res.status(200).json(result);
            }).catch(() =>
                next({message:"Database failed to fetch user, Please try again", status: 401})
            );
    },
    getAllUsers: (req, res, next) => {
        const qurey = knex('users');
        if (req.params.id) {
            qurey.where({
                id: req.params.id
            }).first().then(result => {
                res.status(200).json(result)
            }).catch(error => next({ message: error.message,  status: 500 }))
        } else {
            qurey.then(result => {
                res.status(200).json(result)
            }).catch(error => next({ message: error.message, status: 500 }))
        }
    },
    findOrCreateUser: (data, cb) => {
        let user = {
            first_name: data.name.givenName,
            last_name: data.name.familyName,
            email: data.emails && data.emails[0].value,
            provider: data.provider,
            password: ""
        };
        knex("users").where("email", user.email).first()
            .then(result => {
                if (!result) {
                    knex('users')
                        .insert(user)
                        .then(result2 => {
                            cb(null, result2)
                        })
                        .catch(error => {
                            console.log("error", error);
                            cb(error, null);
                        });
                } else {
                    cb(null, result);
                }
            })
    }
};
