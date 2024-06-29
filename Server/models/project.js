const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ProjectSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  chatbotName: { type: String, default: "" },
  welcomeMessage: { type: String, default: "" },
  inputPlaceholder: { type: String, default: "" },
  primaryColor: { type: String, default: "#7BD568" },
  fontColor: { type: String, default: "#3C3C3C" },
  fontSize: { type: Number, default: 25 },
  chatHeight: { type: Number, default: 50 },
  showSources: { type: Boolean, default: false },
  chatIconSize: { type: Number, default: 48 },
  positionOnScreen: {
    type: String,
    enum: ["bottom right", "top right", "bottom left", "top left"],
    default: "bottom right",
  },
  distanceFromBottom: { type: Number, default: 20 },
  horizontalDistance: { type: Number, default: 20 },
  botIconImageName: { type: String, default: "" },
  episodes: [
    {
      type: Schema.Types.ObjectId,
      ref: "files",
    },
  ],
});

module.exports = mongoose.model("project", ProjectSchema);
