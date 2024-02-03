// app.js

import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import router from './router/route.js';
import config from './config/config.js';

const app = express();

// Connect to MongoDB Atlas using configuration
mongoose.connect(config.database.url, config.database.options);

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
});

// Updated CORS configuration using configuration
const corsOptions = {
  origin: config.cors.allowedOrigins,
  optionsSuccessStatus: config.cors.optionsSuccessStatus,
};

app.use(cors(corsOptions));
app.use(bodyParser.json(config.bodyParser.json));
app.use(bodyParser.urlencoded(config.bodyParser.urlencoded));
app.use(morgan('tiny'));
// app.disable('x-powered-by');

// Routing all routes with /api to route.js
app.use('/api', router);

// Create a mongoose model for the form data
const FormDataModel = mongoose.model('FormData', {
  username: String,
  email: String,
  location: String,
  company: String,
});

app.get('/', (req, res) => {
  res.status(201).json('Home GET Request');
});

const PORT = config.server.port;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
