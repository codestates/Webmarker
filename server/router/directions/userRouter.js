const router = require("express").Router();
const controller = require("./../../controller/index");

router.get("/", controller.users.test);

module.exports = router;
