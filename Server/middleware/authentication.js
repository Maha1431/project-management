const UserService = require("../services/user");

async function verifyUserAuthentication(req, res, next) {
  try {
    const userId = req.header("Authorization");
    if (!userId) throw new Error("Email not found");

    const user = await UserService.verifyUser(userId);
    if (!user) throw new Error("Email is faulty");
    req.user = user;
    next();
  } catch (error) {
    console.log(error);
    return res.status(400).json({ message: error.message });
  }
}

module.exports = { verifyUserAuthentication };
