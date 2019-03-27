let express = require("express");
let server = express.Router();
let todos = require("./todo");
const users = require("./user");
/***
 *
 * */
server.use("/todos", todos);
server.use("/users", users);




module.exports = server;
