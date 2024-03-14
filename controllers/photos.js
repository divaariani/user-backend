const Photo = require('../models/photodata');

const getPhotos = async (req, res) => {
  try {
      const photos = await Photo.find();
      res.status(200).json(photos);
  } catch (error) {
      res.status(404).json({ message: error.message });
  }
}

const uploadPhoto = async (req, res) => {
  try {
    const { filename } = req.file;

    const photo = new Photo({
      filename
    });

    const createdPhoto =await photo.save();
    res.status(201).json(createdPhoto);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

module.exports = { 
  getPhotos,
  uploadPhoto 
};