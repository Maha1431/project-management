const UserModel = require("../models/user");

class UserService {
  constructor(user) {
    this._id = user._id;
    this.name = user.name;
    this.email = user.email;
    this.projects = user.projects;
  }

  static async getUserById(id) {
    const user = await UserModel.findById(id);
    if (!user) throw new Error("User not found");
    return user;
  }

  static async getUserByEmail(email) {
    const user = await UserModel.findOne({ email });
    if (!user) throw new Error("User not found");
    return user;
  }

  static async signInWithEmail(email) {
    const existingUser = await UserModel.findOne({ email });
    if (existingUser) return existingUser;

    const user = new UserModel({ name: email, email });
    await user.save();
    return user;
  }

  static async verifyUser(userId) {
    const user = await UserModel.findById(userId);
    if (!user) return null;
    return user;
  }

  async getUserProjects() {
    const user = await UserModel.findById(this._id).populate("projects");
    if (!user) throw new Error("User not found");

    return user.projects;
  }

  async updateUserName(name) {
    const user = await UserModel.findByIdAndUpdate(
      this._id,
      { name },
      { new: true }
    );
    if (!user) throw new Error("User not found");

    return user;
  }
}

module.exports = UserService;
