const router = require("express").Router();
const controller = require("./../../controller/index");

router.get("/", controller.users.test);
router.post("/signup", controller.users.signup);
router.post("/login", controller.users.login);
router.get("/userinfo", controller.users.userInfo);
router.get("/password/:id", controller.users.checkPassword);
router.patch("/password", controller.users.updatePassword);
router.delete("/", controller.users.withdrawal);
// 구글 로그인 관련
router.get("/auth/google", controller.users.google);
router.get("/auth/google/callback", controller.users.googleCallback);
router.get("/auth/sendToken", controller.users.sendToken);
module.exports = router;
