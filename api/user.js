const express = require("express");
const router = express.Router();
const db = require("./userQueries");
const todoDb = require("./todoQueries");
/**
* @swagger
 * /api/users:
 *      get:
 *          description: Register Users
 *          tags:
 *              - users
 *          produces:
 *              - application/json
 *          responses:
 *              200:
 *                  description: Registered Users
 * /api/users/me:
 *       get:
 *          description: My account
 *          security:
 *              - Bearer: []
 *          tags:
 *              - me
 *          produces:
 *              - application/json
 *          responses:
 *              200:
 *                  description: Authorized user info
 *
*/

router.get("/", db.getAllUsers);
router.get("/me",  todoDb.verifyUser, db.me);

module.exports =  router;
