const { MongoClient, ObjectId } = require('mongodb');

// Connection URL
const url = 'mongodb+srv://easyroute:i9AoXfrN8tbdZmj0@cluster0.xdo4eov.mongodb.net/Accounts?retryWrites=true&w=majority';

// User ID to retrieve data
const userId = '65643d525b99a474bd4713ba'; // Replace with the actual user ID

// Create a new MongoClient
const client = new MongoClient(url, { useNewUrlParser: true, useUnifiedTopology: true });

async function getDataByUserId(userId) {
  try {
    // Connect to the MongoDB server
    await client.connect();

    // Get the reference to the database
    const db = client.db();

    // Fetch user data
    const user = await db.collection('users').findOne({ _id: new ObjectId(userId) });

    if (!user) {
      console.log('User not found');
      return;
    }

    // Fetch role data using RoleID
    const roleId = user.RoleID;
    const role = await db.collection('roles').findOne({ _id: roleId });

    // Fetch company data using CompanyID
    const companyId = user.CompanyID;
    const company = await db.collection('companys').findOne({ _id: companyId });

    // Combine user, role, and company data
    const userData = {
      user,
      role,
      company,
    };

    return userData;
  } finally {
    // Close the client
    await client.close();
  }
}

// Call the function and log the result
getDataByUserId(userId)
  .then((result) => {
    console.log('User Data:', result);
  })
  .catch((err) => {
    console.error('Error:', err);
  });
