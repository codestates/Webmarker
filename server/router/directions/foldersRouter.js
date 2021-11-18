const router = require("express").Router();
const controller = require("./../../controller");

router.get("/", controller.folders.test);
router.post("/", controller.folders.createFolder);
router.put("/", controller.folders.updateFolderName);
router.delete("/:id", controller.folders.deleteFolder);
module.exports = router;
