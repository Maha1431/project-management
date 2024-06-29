const express = require("express");
const {
  createEpisode,
  getEpisode,
  updateEpisodeTranscript,
  deleteEpisode,
} = require("../controllers/episode");

const router = express.Router({ mergeParams: true });

router.post("/", createEpisode);

router.get("/:episodeId", getEpisode);

router.post("/:episodeId", updateEpisodeTranscript);

router.delete("/:episodeId", deleteEpisode);

module.exports = router;
