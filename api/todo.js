const express = require("express");
const router = express.Router();
const db = require("./todoQueries");

router.get("/", db.getAllTodos);
router.post("/", db.createToDo);

module.exports =  router;
