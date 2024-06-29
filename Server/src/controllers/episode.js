const EpisodeService = require("../services/episode");

async function createEpisode(req, res) {
  try {
    const { name, link } = req.body;
    const { projectId } = req.params;
    const episode = await EpisodeService.createEpisode(projectId, name, link);
    return res.status(201).json({
      message: "Created episode successfully",
      episode,
    });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ message: error.message });
  }
}

async function getEpisode(req, res) {
  try {
    const { episodeId } = req.params;
    const episode = await EpisodeService.getEpisodeById(episodeId);
    return res
      .status(200)
      .json({ message: "Fetched episode successfully", episode });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ message: error.message });
  }
}

async function updateEpisodeTranscript(req, res) {
  try {
    const { transcript } = req.body;
    const { episodeId } = req.params;
    const episode = await EpisodeService.getEpisodeById(episodeId);
    const episodeService = new EpisodeService(episode);
    const updatedEpisode = await episodeService.updateTranscript(transcript);
    return res.status(200).json({
      message: "Updated episode transcript successfully",
      episode: updatedEpisode,
    });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ message: error.message });
  }
}

async function deleteEpisode(req, res) {
  try {
    const { projectId, episodeId } = req.params;
    const episode = await EpisodeService.getEpisodeById(episodeId);
    const episodeService = new EpisodeService(episode);
    await episodeService.deleteEpisode(projectId);
    return res.status(200).json({
      message: "Deleted episode successfully",
    });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ message: error.message });
  }
}

module.exports = {
  createEpisode,
  getEpisode,
  updateEpisodeTranscript,
  deleteEpisode,
};
