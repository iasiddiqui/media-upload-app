const express = require('express');
const multer = require('multer');
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const { cloudinary } = require('../config/cloudinaryConfig');
const Media = require('../models/Media');

const router = express.Router();

// Cloudinary storage configuration
const storage = new CloudinaryStorage({
  cloudinary,
  params: async (req, file) => {
    const folder = file.mimetype.startsWith('image/') ? 'thumbnails' : 'videos';
    return {
      folder,
      resource_type: file.mimetype.startsWith('image/') ? 'image' : 'video',
    };
  },
});

// Multer configuration
const upload = multer({
  storage,
  limits: { fileSize: 50 * 1024 * 1024 }, // Max file size: 50MB
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith('image/') || file.mimetype.startsWith('video/')) {
      cb(null, true);
    } else {
      cb(new Error('Invalid file type, only images and videos are allowed'), false);
    }
  },
});

// Upload API
router.post('/', upload.fields([{ name: 'image' }, { name: 'video' }]), async (req, res) => {
  try {
    console.log('Files:', req.files); // Debugging uploaded files
    console.log('Body:', req.body);   // Debugging body content

    if (!req.files || !req.files.image || !req.files.video) {
      return res.status(400).json({ message: 'Both image and video files are required' });
    }

    const { title, description } = req.body;
    const imageUrl = req.files.image[0].path;
    const videoUrl = req.files.video[0].path;

    const newMedia = new Media({ title, description, imageUrl, videoUrl });
    await newMedia.save();

    res.status(200).json({ message: 'Media uploaded successfully', media: newMedia });
  } catch (error) {
    console.error('Upload Error:', error);
    res.status(500).json({ message: 'Server error', error: error.stack });
  }
});

// Fetch All Media
router.get('/', async (req, res) => {
  try {
    const media = await Media.find();
    res.status(200).json(media);
  } catch (error) {
    console.error('Fetch Error:', error);
    res.status(500).json({ message: 'Server error', error: error.stack });
  }
});

// Fetch Single Media by ID
router.get('/:id', async (req, res) => {
  try {
    const media = await Media.findById(req.params.id);
    if (!media) return res.status(404).json({ message: 'Media not found' });
    res.status(200).json(media);
  } catch (error) {
    console.error('Fetch Error:', error);
    res.status(500).json({ message: 'Server error', error: error.stack });
  }
});

module.exports = router;
