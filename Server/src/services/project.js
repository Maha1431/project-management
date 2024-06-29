const { trusted } = require("mongoose");
const ProjectModel = require("../models/project");
const UserModel = require("../models/user");

class ProjectService {
  constructor(project) {
    this._id = project._id;
    this.episodes = project.episodes;
    this.chatbotName = project.chatbotName;
    this.welcomeMessage = project.welcomeMessage;
    this.inputPlaceholder = project.inputPlaceholder;
    this.primaryColor = project.primaryColor;
    this.fontColor = project.fontColor;
    this.fontSize = project.fontSize;
    this.chatHeight = project.chatHeight;
    this.showSources = project.showSources;
    this.chatIconSize = project.chatIconSize;
    this.positionOnScreen = project.positionOnScreen;
    this.distanceFromBottom = project.distanceFromBottom;
    this.horizontalDistance = project.horizontalDistance;
    this.botIconImageName = project.botIconImageName;
  }

  static async getProjectById(id) {
    const project = await ProjectModel.findById(id).populate("episodes");
    console.log(project);
    if (!project) throw new Error("Project not found");
    return project;
  }

  static async createProjectForUser(userId, projectName) {
    const user = await UserModel.findById(userId);
    if (!user) throw new Error("User not found");

    const project = new ProjectModel({ name: projectName });

    user.projects.push(project._id);
    await user.save();
    await project.save();
    return project;
  }

  async getEpisodes() {
    const project = await ProjectModel.findById(this._id).populate("episodes");
    if (!project) throw new Error("Project not found");
    return project.episodes;
  }

  async updateGeneralConfiguration(generalConfigParams) {
    const project = await ProjectModel.findByIdAndUpdate(
      this._id,
      generalConfigParams,
      { new: true }
    );

    return project;
  }

  async updateDisplayConfiguration(displayConfigParams) {
    const project = await ProjectModel.findByIdAndUpdate(
      this._id,
      displayConfigParams,
      { new: true }
    );

    return project;
  }

  async updateBotIconName(botIconImageName) {
    console.log(botIconImageName);
    const project = await ProjectModel.findByIdAndUpdate(
      this._id,
      { botIconImageName },
      { new: true }
    );

    return project;
  }
}

module.exports = ProjectService;
