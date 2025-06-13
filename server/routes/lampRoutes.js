const express = require('express');
const router = express.Router();
const Lamp = require('../models/Lamp'); // Importa il modello

router.get('/lamps', async (req, res) => {
  console.log('GET /api/lamps request received');
  try {
    const lamps = await Lamp.find();
    console.log('Fetched lamps:', lamps);
    res.json(lamps);
  } catch (err) {
    console.error('Error fetching lamps:', err);
    res.status(500).json({ msg: 'Server error', error: err.message });
  }
});

router.get('/lamps/:id', async (req, res) => {
  try {
    const lamp = await Lamp.findById(req.params.id);
    if (!lamp) return res.status(404).json({ msg: 'Lamp not found' });
    res.json(lamp);
  } catch (err) {
    res.status(500).json({ msg: 'Server error' });
  }
});

module.exports = router;