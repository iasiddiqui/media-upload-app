const mongoose = require('mongoose');

const MediaSchema = new mongoose.Schema({
  title: { type: String, required: true, maxlength: 50 },
  description: { type: String, required: true, maxlength: 200 },
  imageUrl: { type: String, required: true },
  videoUrl: { type: String, required: true },
});

module.exports = mongoose.model('Media', MediaSchema);
