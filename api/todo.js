const express = require("express");
const router = express.Router();
const db = require("./todoQueries");

router.get("/", db.getAllTodos);
router.get("/:id", db.getAllTodos);
router.post("/", db.createToDo);
router.put("/:id", db.updateToDo);
router.patch("/:id", db.patchToDo);
router.delete("/:id", db.deleteToDo);

module.exports =  router;
