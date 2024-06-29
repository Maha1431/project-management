const express = require("express");
const multer = require("multer");

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

const {
  createProject,
  getProject,
  updateGeneralConfiguration,
  updateDisplayConfiguration,
  getEpisodes,
  uploadIconImage,
} = require("../controllers/project");

const router = express.Router({ mergeParams: true });

router.post(
  "/:projectId/image",
  upload.single("botIconImage"),
  uploadIconImage
);

router.post("/", createProject);

router.get("/:projectId", getProject);

router.get("/:projectId/episodes", getEpisodes);

router.post(
  "/:projectId/widgetConfiguration/general",
  updateGeneralConfiguration
);

router.post(
  "/:projectId/widgetConfiguration/display",
  upload.single("botIconImage"),
  updateDisplayConfiguration
);

module.exports = router;
