const mongoose = require('mongoose');
const User = require('./models/User');
const Lamp = require('./models/Lamp');
require('dotenv').config();

// Connessione al database
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected for seeding'))
  .catch(err => console.log(err));

// Dati di esempio per le lampade
const lamps = [
  {
    name: 'Silva',
    description: 'A slender lamp evoking the glow of a firefly.',
    price: 49.99,
    image: 'https://example.com/silva.jpg',
  },
  {
    name: 'Notte',
    description: 'A pendant that reflects the warmth of twilight.',
    price: 69.99,
    image: 'https://example.com/notte.jpg',
  },
  {
    name: 'Vita',
    description: 'A lamp with organic form and soft light.',
    price: 59.99,
    image: 'https://example.com/vita.jpg',
  },
];

// Dati di esempio per un utente (opzionale, per testare la registrazione)


// Funzione per popolare il database
async function seedDB() {
  try {
    // Pulisci le collezioni esistenti
    await Lamp.deleteMany({});
    await User.deleteMany({});

    // Inserisci le lampade
    const insertedLamps = await Lamp.insertMany(lamps);
    console.log('Lamps seeded:', insertedLamps);

    

    console.log('Database seeded successfully!');
    process.exit();
  } catch (err) {
    console.error('Seeding error:', err);
    process.exit(1);
  }
}

seedDB();