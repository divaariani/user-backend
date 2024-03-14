const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const { uploadPhoto } = require('../controllers/photos');
const photo_Act = require("../controllers/photos");
const router = express.Router();


const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadPath = path.join(__dirname, '../uploads');
    fs.mkdirSync(uploadPath, { recursive: true });
    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage });

router.get('/All', photo_Act.getPhotos);
router.post('/upload', upload.single('photo'), uploadPhoto);

module.exports = router;