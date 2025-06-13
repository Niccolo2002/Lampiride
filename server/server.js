const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();
const connectDB = require('./config/db');
const Lamp = require('./models/Lamp'); // Importa il modello Lamp

const app = express();

app.use((req, res, next) => {
  console.log(`Received ${req.method} ${req.url}`);
  next();
});

app.use(cors({ origin: 'http://localhost:3000' }));
app.use(express.json());

connectDB();

// Rotta temporanea per test
app.get('/api/lamps', async (req, res) => {
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


// Rotta per una lampada specifica
app.get('/api/lamps/:id', async (req, res) => {
    console.log('GET /api/lamps/:id request received', req.params.id);
    try {
      const lamp = await Lamp.findById(req.params.id);
      if (!lamp) {
        return res.status(404).json({ msg: 'Lamp not found' });
      }
      console.log('Fetched lamp:', lamp);
      res.json(lamp);
    } catch (err) {
      console.error('Error fetching lamp:', err);
      res.status(500).json({ msg: 'Server error', error: err.message });
    }
  });

// Rimuovi o commenta questa riga se stai testando direttamente
// const lampRoutes = require('./routes/lampRoutes');
// app.use('/api/lamps', lampRoutes);

const authRoutes = require('./routes/authRoutes');
app.use('/api/auth', authRoutes);

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));