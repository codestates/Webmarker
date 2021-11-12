const express = require("express");
const router = express.Router();
const usersRouter = require("./directions/userRouter");
const bookmarksRouter = require("./directions/bookmarksRouter");
const foldersRouter = require("./directions/foldersRouter");

router.use("/users", usersRouter);
router.use("/bookmarks", bookmarksRouter);
router.use("/folders", foldersRouter);

module.exports = router;
