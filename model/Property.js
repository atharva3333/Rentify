const mongoose = require('mongoose');

const propertySchema = new mongoose.Schema({
  email: String,  
  propertyName: String,
  address: String,
  city: String,
  state: String,
  price: Number
});

const Property = mongoose.model('Property', propertySchema);

module.exports = Property;
