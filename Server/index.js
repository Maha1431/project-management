const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const UserRoutes = require("./routes/user");
const ProjectRoutes = require("./routes/project");
const EpisodeRoutes = require("./routes/episode");
const { verifyUserAuthentication } = require("./middleware/authentication");

dotenv.config();
const app = express();
const PORT = process.env.PORT || 2000;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

// MongoDB connection URL
const mongoURI = 'mongodb+srv://mmahaece07:Maha1431@cluster0.iei1qfm.mongodb.net/Podcast';
console.log("MongoDB URI:", mongoURI);

// Connect to MongoDB using mongoose
mongoose.connect(mongoURI).then(() => {
  console.log("Connected to MongoDB successfully");
  server = app.listen(PORT, () => {
      console.log(`App listening on port ${PORT}`);
  });
}).catch(err => {
  console.error("Error connecting to MongoDB:", err);
});

app.get("/", (req, res) => {
  return res.json({ message: "Here is your data" });
});

app.use("/user", UserRoutes);
app.use("/project", verifyUserAuthentication, ProjectRoutes);
app.use("/project/:projectId/episode", verifyUserAuthentication, EpisodeRoutes);

app.use((req, res) => {
  res.status(404).json({ message: "Route Not Found" });
});

