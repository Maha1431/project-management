const EpisodeModel = require("../models/episode");
const ProjectModel = require("../models/project");

class EpisodeService {
  constructor(episode) {
    this._id = episode._id;
    this.name = episode.name;
    this.link = episode.link;
    this.transcript = episode.transcript;
  }

  static async getEpisodeById(id) {
    const episode = await EpisodeModel.findById(id);
    if (!episode) throw new Error("Episode not found");
    return episode;
  }

  static async createEpisode(projectId, name, link) {
    const project = await ProjectModel.findById(projectId);
    if (!project) throw new Error("Project not found");

    const episode = new EpisodeModel({
      name,
      link,
      transcript: link,
      uploadTimeStamp: Date.now(),
    });
    project.episodes.push(episode._id);
    await project.save();
    await episode.save();
    return episode;
  }

  async deleteEpisode(projectId) {
    const project = await ProjectModel.findById(projectId);
    project.episodes = project.episodes.filter(
      (episode) => episode._id.toString() !== this._id.toString()
    );

    await project.save();
    await EpisodeModel.findByIdAndDelete(this._id);
  }

  async updateTranscript(transcript) {
    console.log(transcript, this._id);
    const episode = await EpisodeModel.findByIdAndUpdate(
      this._id,
      {
        link: transcript,
        transcript,
      },
      { new: true }
    );
    // console.log(episode);
    return episode;
  }
}

module.exports = EpisodeService;
