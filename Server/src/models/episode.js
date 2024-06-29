const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const EpisodeSchema = new Schema({
  name: String,
  link: String,
  transcript: String,
  uploadTimeStamp: Date,
});

module.exports = mongoose.model("files", EpisodeSchema);
