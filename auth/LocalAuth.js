const express = require("express");
const router = express.Router();
const helper = require("./helper");

router.post("/login",  helper.signIn);
router.post("/register",  helper.register);

module.exports =  router;
