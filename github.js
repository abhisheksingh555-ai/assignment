const express = require("express");
const router = express.Router();
const { searchUsers, getUserProfile, getUserRepos } = require("../controllers/githubController");

router.get("/search", searchUsers);
router.get("/users/:username", getUserProfile);
router.get("/users/:username/repos", getUserRepos);

module.exports = router;
