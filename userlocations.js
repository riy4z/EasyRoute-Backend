// Import the UserLocation model
import UserLocationModel from "./model/UserLocation.model.js";

// AddUserLocation function to store userId and locationId
export async function AddUserLocation(req, res) {
  try {
    // Extract userId and locationId from the request body or params
    const { userId, locationId } = req.body; // Assuming you are sending userId and locationId in the request body

    // Validate if userId and locationId are provided
    if (!userId || !locationId) {
      return res.status(400).json({ error: "UserId and LocationId are required" });
    }

    // Create a new UserLocation document
    const newUserLocation = new UserLocationModel({
      UserID: userId,
      LocationID: locationId,
    });

    // Save the document to the database
    await newUserLocation.save();

    // Send a success response
    res.status(201).json({ message: "User location added successfully" });
  } catch (error) {
    // Handle errors
    console.error("Error adding user location:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}
