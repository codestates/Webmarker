const router = require("express").Router();
const controller = require("./../../controller/index");

router.get("/", controller.bookmarks.test);

module.exports = router;
