// Backend REST API for Tasks 1.4 – 1.6
const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./db');
const FashionShopData = require('./model');

dotenv.config();

const app = express();

// Task 1.4 connect to MongoDB + enable JSON requests
connectDB();
app.use(express.json());

// Test route
app.get('/', (req, res) => {
  res.send('Fashion Shop API is running');
});


//Task 1.5 POST: Add a product
app.post('/api/products/add', async (req, res) => {
  try {
    const newProduct = await FashionShopData.create(req.body);
    res.status(201).json(newProduct);
  } catch (error) {
    console.error('Error adding product:', error);
    res.status(500).json({
      message: 'Error adding product',
      error: error.message
    });
  }
});

//Task 1.6 POST: Update product by Product Name
app.post('/api/products/update', async (req, res) => {
  try {
    const { productName, ...updates } = req.body;

    const updated = await FashionShopData.findOneAndUpdate(
      { productName },
      updates,
      { new: true }
    );

    if (!updated) {
      return res.status(404).json({ message: 'Product not found' });
    }

    res.json(updated);
  } catch (error) {
    console.error('Error updating product:', error);
    res.status(500).json({
      message: 'Error updating product',
      error: error.message
    });
  }
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

//Task 1.7 POST: Delete products
app.post('/api/products/delete', async (req, res) => {
  try {
    const { productName } = req.body;

    const deleted = await FashionShopData.deleteOne({ productName });

    if (deleted.deletedCount === 0) {
      return res.status(404).json({ message: 'Product not found' });
    }

    res.json({ message: 'Product deleted' });
  } catch (error) {
    console.error('Error deleting product: ', error);
    res.status(500).json({
      message: 'Error in deleting product',
      error: error.message
    });
  }
});

// Task 1.8 GET: Season summary for units sold, returns and revenue
app.get('/api/season/summary', async (req, res) => {
  try {
    const { season } = req.query;

    const result = await FashionShopData.aggregate([
      { $match: { season } },
      {
        $group: {
          _id: "$season",
          totalUnits: { $sum: "$unitsSold" },
          totalReturns: { $sum: "$returns" },
          totalRevenue: { $sum: "$revenue" }
        }
      }
    ]);

    if (result.length === 0) {
      return res.status(404).json({ message: 'Data unavailable' });
    }

    res.json(result[0]);
  } catch (error) {
    console.error('Error getting summary:', error);
    res.status(500).json({
      message: 'Error getting summary',
      error: error.message
    });
  }
});

// Task 1.9 GET: Display first 10 products where unit sold is greater than given value
app.get('/api/products/top', async (req, res) => {
  try {
    const { season, minUnits } = req.query;

    const products = await FashionShopData.find({
      season,
      unitsSold: { $gt: Number(minUnits) }
    }).limit(10);

    res.json(products);
  } catch (error) {
    console.error('Error getting top selling products: ', error);
    res.status(500).json({
      message: 'Error getting top selling products',
      error: error.message
    });
  }
});

// Task 1.10 GET: Display all products where avg customer rating meets user condition
app.get('/api/products/ratingCheck', async (req, res) => {
  try {
    const { season, operator, rating } = req.query;
    const threshold = Number(rating);

    const avgResult = await FashionShopData.aggregate([
      { $match: { season } },
      { $group: { _id: "$season", avgRating: { $avg: "$customerRating" } } }
    ]);

    if (avgResult.length === 0) {
      return res.json({ message: "No data found" });
    }

    const avg = avgResult[0].avgRating;
    let conditionMet = false;

    if (operator === "gt" && avg > threshold) conditionMet = true;
    if (operator === "gte" && avg >= threshold) conditionMet = true;
    if (operator === "lt" && avg < threshold) conditionMet = true;
    if (operator === "lte" && avg <= threshold) conditionMet = true;
    if (operator === "eq" && avg === threshold) conditionMet = true;

    if (!conditionMet) {
      return res.json({
        message: "Condition not met",
        season,
        avgRating: avg
      });
    }

    const products = await FashionShopData.find({ season });

    res.json({
      season,
      avgRating: avg,
      data: products
    });

  } catch (error) {
    console.error('Error: ', error);
    res.status(500).json({
      message: 'Error',
      error: error.message
    });
  }
});
