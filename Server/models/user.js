const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  projects: [
    {
      type: Schema.Types.ObjectId,
      ref: "project",
    },
  ],
});

module.exports = mongoose.model("user", UserSchema);
