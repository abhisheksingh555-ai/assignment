const express = require("express");
const router = express.Router();
const { getBookmarks, addBookmark, removeBookmark, checkBookmark } = require("../controllers/bookmarkController");

router.get("/", getBookmarks);
router.post("/", addBookmark);
router.delete("/:repoId", removeBookmark);
router.get("/check/:repoId", checkBookmark);

module.exports = router;
