const router = require("express").Router();
const controller = require("./../../controller/index");

router.get("/", controller.users.test);
router.post("/signup", controller.users.signup);
router.get("/login", controller.users.login);
router.get("/userinfo", controller.users.userInfo);
router.get("/password", controller.users.checkPassword);
router.patch("/password", controller.users.updatePassword);
router.delete("/", controller.users.withdrawal);

module.exports = router;
