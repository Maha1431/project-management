const ProjectService = require("../services/project");

const { getSignedUrl } = require("@aws-sdk/s3-request-presigner");
const {
  S3Client,
  PutObjectCommand,
  GetObjectCommand,
} = require("@aws-sdk/client-s3");

async function createProject(req, res) {
  try {
    const { name } = req.body;
    const user = req.user;

    const project = await ProjectService.createProjectForUser(user._id, name);
    return res
      .status(201)
      .json({ message: "Created project successfully", project });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ message: error.message });
  }
}

async function getProject(req, res) {
  try {
    const { projectId } = req.params;
    const project = await ProjectService.getProjectById(projectId);
    return res
      .status(200)
      .json({ message: "Fetched project successfully", project });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ message: error.message });
  }
}

//TODO: get image form S3
async function getEpisodes(req, res) {
  try {
    const { projectId } = req.params;
    const project = await ProjectService.getProjectById(projectId);
    const projectService = new ProjectService(project);
    const episodes = await projectService.getEpisodes();
    return res
      .status(200)
      .json({ message: "Fetched episodes successfully", episodes });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ message: error.message });
  }
}

async function updateGeneralConfiguration(req, res) {
  try {
    const { projectId } = req.params;
    const { generalConfigParams } = req.body;

    console.log(generalConfigParams);
    const project = await ProjectService.getProjectById(projectId);
    const projectService = new ProjectService(project);
    const updatedProject = await projectService.updateGeneralConfiguration(
      generalConfigParams
    );
    return res.status(200).json({
      message: "Updated General configuration successfully",
      project: updatedProject,
    });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ message: error.message });
  }
}

// TODO: Add image storing functionality
async function updateDisplayConfiguration(req, res) {
  try {
    const { projectId } = req.params;
    const displayConfigParams = req.body;

    const project = await ProjectService.getProjectById(projectId);
    const projectService = new ProjectService(project);
    const updatedProject = await projectService.updateDisplayConfiguration(
      displayConfigParams
    );
    return res.status(200).json({
      message: "Updated Display configuration successfully",
      project: updatedProject,
    });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ message: error.message });
  }
}

async function uploadIconImage(req, res) {
  try {
    const { projectId } = req.params;
    // const displayConfigParams = req.body;

    console.log(req.file);

    const s3 = new S3Client({
      credentials: {
        accessKeyId: process.env.ACCESS_KEY,
        secretAccessKey: process.env.SECRET_ACCESS_KEY,
      },
      region: process.env.BUCKET_REGION,
    });

    const params = {
      Bucket: process.env.BUCKET_NAME,
      Key: projectId,
      Body: req.file.buffer,
      ContentType: req.file.mimetype,
    };

    const command = new PutObjectCommand(params);

    await s3.send(command);

    const params2 = {
      Bucket: process.env.BUCKET_NAME,
      Key: projectId,
    };

    // https://aws.amazon.com/blogs/developer/generate-presigned-url-modular-aws-sdk-javascript/
    const command2 = new GetObjectCommand(params2);
    const seconds = 60;
    const url = await getSignedUrl(s3, command2, { expiresIn: 604800 });

    const project = await ProjectService.getProjectById(projectId);
    const projectService = new ProjectService(project);
    await projectService.updateBotIconName(url);

    return res.status(200).json({
      message: "Uploaded Icon Image successfully",
      imageUrl: url,
    });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ message: error.message });
  }
}

module.exports = {
  createProject,
  getProject,
  getEpisodes,
  updateGeneralConfiguration,
  updateDisplayConfiguration,
  uploadIconImage,
};
