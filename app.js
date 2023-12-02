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

// Updated CORS configuration
const corsOptions = {
  origin: 'http://localhost:3000', // Update this to match your front-end URL
  optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan('tiny'));
app.disable('x-powered-by');

//Routing all routes with /api to route.js
app.use('/api', router);

// Create a mongoose model for the form data
const FormDataModel = mongoose.model('FormData', {
  username: String,
  email: String,
  location: String,
  company: String,
});



app.get('/', (req, res) => {
  res.status(201).json("Home GET Request");
});


const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});