// server.js
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();

// Connect to MongoDB Atlas
mongoose.connect('mongodb+srv://easyroute:i9AoXfrN8tbdZmj0@cluster0.xdo4eov.mongodb.net/Accounts?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
});
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Define a Mongoose model for the "addressData" collection
const addressSchema = new mongoose.Schema({
    "First Name": String,
    "Last Name": String,
    "Street Address": String,
    "City": String,
    "State": String,
    "ZIP Code": String,
    "longitude": Number,
    "latitude": Number,
    "isHidden": { type: Boolean, default: false },
  });
  addressSchema.index({ "First Name": 1, "Last Name": 1, "Street Address":1, "City": 1,"State":1, "ZIP Code": 1 }, { unique: true });
  const AddressInfo = mongoose.model('AddressInfo', addressSchema);

  // Define a route to store addressData
app.post('/api/store-address-data', async (req, res) => {
  try {
    const data = req.body; 
    // This assumes that your addressData is sent in the request body
    const savedData = new AddressInfo(data);
    await savedData.save();
    res.status(201).json({ message: 'Address data saved successfully' });
  } catch (error) {
      if (error.code === 11000) {
          // MongoDB error code 11000 indicates a duplicate key error
          res.status(400).json({ error: 'Duplicate value found in unique field' });
        } else {
          res.status(500).json({ error: 'Error saving address data' });
        }
  }
});

// Define a route to update addressData by ID
app.patch('/api/update-address-data/:id', async (req, res) => {
  const { id } = req.params;
  const updatedData = req.body;

  try {
    const addressData = await AddressInfo.findByIdAndUpdate(id, updatedData, { new: true });

    if (addressData) {
      res.status(200).json(addressData);
    } else {
      res.status(404).json({ message: 'Address data not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Error updating address data' });
  }
});
  
// Define a route to retrieve addressData
app.get('/api/get-address-data', async (req, res) => {
  try {
    const addressData = await AddressInfo.find({}); // Fetches all data from the AddressInfo collection
    if (addressData && addressData.length > 0) {
      res.setHeader('Content-Type', 'application/json'); 
      res.status(200).json(addressData);
    } else {
      res.status(404).json({ message: 'No address data found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Error retrieving address data' });
  }
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
