const router = require("express").Router();
const controller = require("./../../controller");

router.get("/", controller.folders.test);

module.exports = router;
