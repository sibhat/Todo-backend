/**
 * @swagger
 * components:
 *   securitySchemes:
 *      Bearer:
 *          type: http
 *          scheme: bearer
 *          bearerFormat: JWT
 * paths:
 *   /auth/local/register:
 *       post:
 *          description: Register Users
 *          tags:
 *              - users
 *          produces:
 *              - application/json
 *          requestBody:
 *              summary: login a user.
 *              required: true
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              first_name:
 *                                  type: string
 *                              last_name:
 *                                  type: string
 *                              email:
 *                                  type: string
 *                              password:
 *                                  type: string
 *          responses:
 *              200:
 *                  description: Registered Users id
 *   /auth/local/login:
 *       post:
 *          description: Login Users
 *          tags:
 *              - users
 *          produces:
 *              - application/json
 *          requestBody:
 *              summary: login a user.
 *              required: true
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              email:
 *                                  type: string
 *                              password:
 *                                  type: string
 *          responses:
 *              200:
 *                  description: Registered Users id
 */
const express = require("express");
const router = express.Router();
const helper = require("./helper");
router.post("/login",  helper.signIn);
router.post("/register",  helper.register);

module.exports =  router;
