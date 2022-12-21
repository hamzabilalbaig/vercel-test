const express = require("express");
const {
  createReel,
  likeAndUnlikeReel,
  updateCaption,
  deleteReel,
  getReelOfFollowing,
  commentOnReel,
  deleteComment,
} = require("../controllers/reel");
const { isAuthenticated } = require("../middlewares/auth");

const router = express.Router();

router.route("/reel/upload").post(isAuthenticated, createReel);

router
  .route("/reel/:id")
  .get(isAuthenticated, likeAndUnlikeReel)
  .put(isAuthenticated, updateCaption)
  .delete(isAuthenticated, deleteReel);

router.route("/reels").get(isAuthenticated, getReelOfFollowing);

router
  .route("/reel/comment/:id")
  .put(isAuthenticated, commentOnReel)
  .delete(isAuthenticated, deleteComment);

module.exports = router;
