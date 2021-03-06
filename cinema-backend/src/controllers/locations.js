const express = require('express');
const Locations = require('../models/locations');

const locationsRouter = express.Router();

locationsRouter.get('/', async (req, res) => {
  try {
    const allLocations = await Locations.find();
    return res.json(allLocations);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

locationsRouter.post('/', async (req, res) => {
  const {
    location, price, totalSeats, place, salong, mapUrl
  } = req.body;

  try {
    if (location && price && totalSeats && place && salong && mapUrl) {
      const newLocation = new Locations({
        location,
        price,
        totalSeats,
        place,
        salong,
        mapUrl
      });
      await newLocation.save();
      return res.json(newLocation);
    }
    return res
      .status(400)
      .json({ message: 'please include location, price, totalSeats, place, salong, mapUrl' });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});
module.exports = locationsRouter;
