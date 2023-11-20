// server.js
import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import router from './router/route.js';

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
app.use(morgan('tiny'));
app.disable('x-powered-by');


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
  });
  addressSchema.index({ "First Name": 1, "Last Name": 1 }, { unique: true });
  const AddressInfo = mongoose.model('AddressInfo', addressSchema);
const CsvDetails = mongoose.model('CsvDetails', {
    UserName: String,
    FileName: String,
    TotalCount: Number,
    IsComplete: Boolean,
    CreatedDateTime: Date,
    LastModifiedDateTime: Date,
  });


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
app.post('/api/process-csv', async (req, res) => {
    const csvData = req.body.csvData;
  
    // Process the CSV data and store the details in the CsvDetails collection
    try {
      const newCsvDetails = new CsvDetails({
        UserName: csvData[0]['UserName'], 
        FileName: 'example.csv', 
        TotalCount: csvData.length,
        IsComplete: true,
        CreatedDateTime: new Date(),
        LastModifiedDateTime: new Date(),
      });
  
      await newCsvDetails.save();
  
      res.json({ success: true, details: newCsvDetails });
    } catch (error) {
      console.error('Error processing CSV data:', error);
      res.status(500).json({ success: false, error: 'Internal server error' });
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
  
  app.get('/',(req,res) => {
    res.status(201).json("Home GET Request")
  });

  app.use('/api', router);
 
  const PORT = process.env.PORT || 4000;

  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  })