const express = require("express");
const router = express.Router();
const db = require("./userQueries");

router.get("/", db.getAllUsers);
// router.post("/", db.createToDo);

module.exports =  router;
