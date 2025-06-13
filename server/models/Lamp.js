const mongoose = require('mongoose');

const lampSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  image: { type: String, required: true },
}, { collection: 'lamps' });

module.exports = mongoose.model('Lamp', lampSchema);