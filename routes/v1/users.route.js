const express = require("express");
const userControllers = require("../../controllers/users.controller");
const router = express.Router();

router.get("/random", userControllers.getRandomUser);
/**
 * @api {get} /api/v1/all
 * @apiDescription Get all the users
 * @apiPermission user
 *
 * @apiHeader {String} Authorization   User's access token
 *
 * @apiParam  {Number{1-}}         [page=1]     List page
 * @apiParam  {Number{1-100}}      [limit=10]  Users per page
 *
 * @apiSuccess {Object[]} all the tools.
 *
 * @apiError (Unauthorized 401)  Unauthorized  Only authenticated users can access the data
 * @apiError (Forbidden 403)     Forbidden     Only admins can access the data
 */
router.get("/all", userControllers.getAllUsers);

module.exports = router;