const express = require("express");
const {
  loginUser,
  updateUserName,
  getProjects,
  getUserById,
  checkAuth,
} = require("../controllers/user");
const { verifyUserAuthentication } = require("../middleware/authentication");

const router = express.Router();

router.post("/", verifyUserAuthentication, updateUserName);

router.post("/login", loginUser);

router.post("/checkAuth", verifyUserAuthentication, checkAuth);

router.get("/projects", verifyUserAuthentication, getProjects);

router.get("/:userId", verifyUserAuthentication, getUserById);

module.exports = router;
