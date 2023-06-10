var express = require("express");
var router = express.Router();

const { isSignedIn, isAuthenticated } = require("../controllers/auth");
const { getUserById } = require("../controllers/auth");
const { getUserProfile, changeProfileMode, addInOpento, getSelfProfile, removeFromOpento, editUsername, editUserBio } = require("../controllers/user");

router.param("userId", getUserById);

router.get("/profile/self/:userId", isSignedIn, isAuthenticated, getSelfProfile)
router.get("/profile/:userId", isSignedIn, isAuthenticated, getUserProfile)
router.get("/profile/changeMode/:userId", isSignedIn, isAuthenticated, changeProfileMode)
router.put("/profile/addToOpen/:userId", isSignedIn, isAuthenticated, addInOpento)
router.put("/profile/removeFromOpen/:userId", isSignedIn, isAuthenticated, removeFromOpento)
router.put("/profile/edit/username/:userId", isSignedIn, isAuthenticated, editUsername)
router.put("/profile/edit/bio/:userId", isSignedIn, isAuthenticated, editUserBio)

module.exports = router;