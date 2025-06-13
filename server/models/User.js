const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  cart: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Lamp' }],
}, { collection: 'users' }); // Forza il nome della collezione a 'users'

module.exports = mongoose.model('User', userSchema);

