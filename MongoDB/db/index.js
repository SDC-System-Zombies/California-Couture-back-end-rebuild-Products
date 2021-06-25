const mongoose = require('mongoose');
const { Schema } = mongoose;
mongoose.connect('mongodb://localhost:27017/atelier', {useNewUrlParser: true, useUnifiedTopology: true});

const productSchema = new Schema({
  product_id: {
    type: Number,
    unique: true
  },
  name: String,
  slogan: String,
  description: String,
  category: String,
  default_price: Number
});