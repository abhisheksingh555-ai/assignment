const mongoose = require("mongoose");

const bookmarkSchema = new mongoose.Schema(
  {
    repoId: { type: Number, required: true, unique: true },
    name: { type: String, required: true },
    fullName: { type: String, required: true },
    description: { type: String, default: "" },
    stars: { type: Number, default: 0 },
    forks: { type: Number, default: 0 },
    language: { type: String, default: null },
    htmlUrl: { type: String, required: true },
    ownerAvatar: { type: String },
    ownerLogin: { type: String },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Bookmark", bookmarkSchema);
