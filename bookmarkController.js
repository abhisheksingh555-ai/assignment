const Bookmark = require("../models/Bookmark");

const getBookmarks = async (req, res) => {
  try {
    const bookmarks = await Bookmark.find().sort({ createdAt: -1 });
    res.json(bookmarks);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch bookmarks." });
  }
};

const addBookmark = async (req, res) => {
  try {
    const existing = await Bookmark.findOne({ repoId: req.body.repoId });
    if (existing) return res.status(409).json({ error: "Already bookmarked." });

    const bookmark = new Bookmark(req.body);
    await bookmark.save();
    res.status(201).json(bookmark);
  } catch (err) {
    res.status(500).json({ error: "Failed to save bookmark." });
  }
};

const removeBookmark = async (req, res) => {
  try {
    const result = await Bookmark.findOneAndDelete({ repoId: req.params.repoId });
    if (!result) return res.status(404).json({ error: "Bookmark not found." });
    res.json({ message: "Bookmark removed." });
  } catch (err) {
    res.status(500).json({ error: "Failed to remove bookmark." });
  }
};

const checkBookmark = async (req, res) => {
  try {
    const exists = await Bookmark.exists({ repoId: req.params.repoId });
    res.json({ bookmarked: !!exists });
  } catch (err) {
    res.status(500).json({ error: "Failed to check bookmark." });
  }
};

module.exports = { getBookmarks, addBookmark, removeBookmark, checkBookmark };
