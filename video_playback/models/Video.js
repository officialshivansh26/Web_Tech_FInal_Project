// models/Video.js
const mongoose = require('mongoose');

const videoSchema = new mongoose.Schema({
  title: String,
  youtubeLink: String
});

const Video = mongoose.model('Video', videoSchema);

module.exports = Video;
