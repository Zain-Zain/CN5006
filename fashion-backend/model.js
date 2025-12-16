// Task 1.2 – Mongoose Schema & Model
const mongoose = require('mongoose');

const fashionSchema = new mongoose.Schema({
  productCategory: { type: String, required: true },
  productName:     { type: String, required: true, unique: true },
  unitsSold:       { type: Number, required: true, min: 0 },
  returns:         { type: Number, required: true, min: 0 },
  revenue:         { type: Number, required: true, min: 0 },
  customerRating:  { type: Number, required: true, min: 0, max: 5 },
  stockLevel:      { type: Number, required: true, min: 0 },
  season:          { type: String, required: true },
  trendScore:      { type: Number, required: true, min: 0 }
});

const FashionShopData = mongoose.model('FashionShopData', fashionSchema);

module.exports = FashionShopData;
