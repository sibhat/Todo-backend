const express = require("express");
const router = express.Router();
const db = require("./todoQueries");
/**
 * @swagger
* paths:
*   /api/todos:
*       get:
*           tags:
*               - todos
*           description: Get all todos
*           produces:
*               - application/json
*           responses:
*               200:
*                   description: Array of todos object
*       post:
*           summary: Add new TodoItem
*           security:
*               - Bearer: []
*           tags:
*               - todos
*           produces:
*               - application/json
*           requestBody:
*              description: Optional description in *Markdown*
*              required: true
*              content:
*                   application/json:
*                       schema:
*                           type: object
*                           properties:
*                               title:
*                                   type: string
*                               description:
*                                  type: string
 *           responses:
*               200:
*                   description: Array of todos object
*               401:
*                  description: Authorization information is missing or invalid.
*               '5XX':
*                  description: Unexpected error.
*   /api/todos/{id}:
*       get:
*           description: Get  todos by id
*           tags:
*               - todos
*           produces:
*               - application/json
*           security:
*               - Bearer: []
*           parameters:
*               - in: path
*                 name: id
*                 required: true
*                 schema:
*                   type: integer
*
*           responses:
*               200:
*                   description: Todos by id
*       put:
*           description: Edit todos
*           tags:
*               - todos
*           produces:
*               - application/json
*           security:
*               - Bearer: []
*           parameters:
*               - in: path
*                 name: id
*                 required: true
*                 schema:
*                   type: integer
*           requestBody:
*              description: Optional description in *Markdown*
*              required: true
*              content:
*                   application/json:
*                       schema:
*                           type: object
*                           properties:
*                               title:
*                                   type: string
*                                   required: true
*                               description:
*                                  type: string
*                                  required: true
*           responses:
*               200:
*                   description: Array of todos object
*       patch:
*           description: Partial Edit todos by Id
*           tags:
*               - todos
*           security:
*               - Bearer: []
*           produces:
*               - application/json
*           parameters:
*               - in: path
*                 name: id
*                 required: true
*                 schema:
*                   type: integer
*           requestBody:
*              description: Optional description in *Markdown*
*              required: true
*              content:
*                   application/json:
*                       schema:
*                           type: object
*                           properties:
*                               title:
*                                   type: string
*                                   required: false
*                               description:
*                                  type: string
*                                  required: false
*           responses:
*               200:
*                   description: Array of todos object
*       delete:
*           description: Delete  todos by id
*           tags:
*               - todos
*           security:
*              - Bearer: []
*           produces:
*               - application/json
*           parameters:
*               - in: path
*                 name: id
*                 required: true
*                 schema:
*                   type: integer
*           responses:
*               200:
*                   description: Todos by id
 */
router.get("/", db.getAllTodos);
router.get("/:id", db.verifyUser, db.getAllTodos);
router.post("/", db.verifyUser, db.createToDo);
router.put("/:id", db.verifyUser, db.authorizeUser, db.updateToDo);
router.patch("/:id", db.verifyUser, db.authorizeUser, db.patchToDo);
router.delete("/:id", db.verifyUser, db.authorizeUser, db.deleteToDo);

module.exports = router;
