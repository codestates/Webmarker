const router = require("express").Router();
const controller = require("./../../controller/index");

router.get("/", controller.bookmarks.allBookmarks);
router.post("/", controller.bookmarks.addBookmark);
router.update("/", controller.bookmarks.updateBookmark);
router.update("/{:id}", controller.bookmarks.moveBookmark);
router.delete("/", controller.bookmarks.deleteBookmark);

module.exports = router;
