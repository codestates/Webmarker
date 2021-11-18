const router = require("express").Router();
const controller = require("./../../controller/index");

router.get("/", controller.bookmarks.allBookmarks);
router.post("/", controller.bookmarks.addBookmark);
router.put("/", controller.bookmarks.updateBookmark);
router.patch("/:id", controller.bookmarks.moveBookmark);
router.delete("/:id", controller.bookmarks.deleteBookmark);

module.exports = router;
