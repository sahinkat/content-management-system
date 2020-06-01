const express = require('express');
const router = new express.Router();

const parametersController = require('../controllers/parameters.controller');

/**
 * @swagger
 * tags:
 *   name: Parameters
 *   description: Parameter management
 */

/**
 * @swagger
 * path:
 *  /parameters/:
 *    post:
 *      summary: Create a new parameter
 *      tags: [Parameters]
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Parameters'
 *      responses:
 *        "200":
 *          description: A user schema
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/User'
 */
router.post('/', parametersController.insertParameter);
router.get('/', parametersController.getPage);
module.exports = router;
