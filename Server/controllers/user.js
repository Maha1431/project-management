const UserService = require("../services/user");

async function loginUser(req, res) {
  try {
    const { email } = req.body;
    const user = await UserService.signInWithEmail(email);
    return res
      .status(200)
      .json({ message: "User logged in succcessfully", user });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ message: error.message });
  }
}

async function checkAuth(req, res) {
  try {
    const user = req.user;
    return res.status(200).json({ message: "User Auth succcessfully", user });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ message: error.message });
  }
}

async function getUserByEmail(req, res) {
  try {
    const { email } = req.body;
    const user = await UserService.getUserByEmail(email);
    return res.status(200).json({ message: "Fetched user successfully", user });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ message: error.message });
  }
}

async function getUserById(req, res) {
  try {
    const { userId } = req.params;
    const user = await UserService.getUserById(userId);
    return res.status(200).json({ message: "Fetched user successfully", user });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ message: error.message });
  }
}

async function getProjects(req, res) {
  try {
    const user = req.user;
    const userService = new UserService(user);
    const projects = await userService.getUserProjects();

    return res
      .status(200)
      .json({ message: "Fetched projects successfully", projects });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ message: error.message });
  }
}

async function updateUserName(req, res) {
  try {
    const { name } = req.body;
    const user = req.user;

    const userService = new UserService(user);

    const updatedUser = await userService.updateUserName(name);
    console.log(updatedUser);
    return res
      .status(201)
      .json({ message: "Updated user name successfully", user: updatedUser });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ message: error.message });
  }
}

module.exports = {
  loginUser,
  checkAuth,
  getUserByEmail,
  getUserById,
  getProjects,
  updateUserName,
};
