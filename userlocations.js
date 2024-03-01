// Import the UserLocation model
import UserLocationModel from "./model/UserLocation.model.js";

export async function getUsersByLocation(req, res) {
  try {
      const locationId = req.query.locationId;

      
      const users = await UserLocationModel.find({ LocationID: locationId });

      res.send(users);
  } catch (error) {
      console.error("Error fetching users by LocationID:", error);
      res.status(500).send("Internal Server Error");
  }
}

// AddUserLocation 
export async function AddUserLocation(req, res) {
  try {
    // Extract userId and locationId from the request body or params
    const { userId, locationId, role } = req.body; // Assuming you are sending userId and locationId in the request body
    console.log(userId, locationId, role)
    // Validate if userId and locationId are provided
    if (!userId || !locationId || role==undefined) {
      return res.status(400).json({ error: "UserId, LocationId & Role are required" });
    }

    // Create a new UserLocation document
    const newUserLocation = new UserLocationModel({
      UserID: userId,
      LocationID: locationId,
      RoleHierarchy: role,
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

// Fetch
export async function GetUserLocations(req, res) {
  try {
    const userId = req.query.userId; // Use req.query instead of req.params

    if (!userId) {
      return res.status(400).json({ error: "UserId is required" });
    }

    // Fetch user locations based on userId
    const userLocations = await UserLocationModel.find({ UserID: userId });

    // Send the user locations in the response
    res.status(200).json({ userLocations });
  } catch (error) {
    console.error("Error fetching user locations:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

// DeleteUserLocation
export async function DeleteUserLocation(req, res) {
  try {
    // Extract userId and locationId from the request body or params
    const { userId, locationId } = req.body; // Assuming you are sending userId and locationId in the request body
    // Validate if userId and locationId are provided
    if (!userId || !locationId) {
      return res.status(400).json({ error: "UserId and LocationId are required" });
    }

    // Find and delete the UserLocation document based on userId and locationId
    const deletedUserLocation = await UserLocationModel.findOneAndDelete({
      UserID: userId,
      LocationID: locationId,
    });

    // Check if the user location was found and deleted
    if (!deletedUserLocation) {
      return res.status(404).json({ error: "User location not found" });
    }

    // Send a success response
    res.status(200).json({ message: "User location deleted successfully" });
  } catch (error) {
    // Handle errors
    console.error("Error deleting user location:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

// UpdateUserLocationRoleHierarchy
export async function UpdateUserLocationRole(req, res) {
  try {
    // Extract userId, locationId, and newRoleHierarchy from the request body or params
    const { userId, locationId, newRoleHierarchy } = req.body; // Assuming you are sending userId, locationId, and newRoleHierarchy in the request body
    // Validate if userId, locationId, and newRoleHierarchy are provided
    if (!userId || !locationId || newRoleHierarchy === undefined) {
      return res.status(400).json({ error: "UserId, LocationId, and New RoleHierarchy are required" });
    }

    // Find and update the UserLocation document based on userId and locationId
    const updatedUserLocation = await UserLocationModel.findOneAndUpdate(
      {
        UserID: userId,
        LocationID: locationId,
      },
      { RoleHierarchy: newRoleHierarchy },
      { new: true } // To return the updated document
    );
    // Check if the user location was found and updated
    if (!updatedUserLocation) {
      return res.status(404).json({ error: "User location not found" });
    }
    // Send a success response
    res.status(200).json({ message: "User location RoleHierarchy updated successfully" });
  } catch (error) {
    // Handle errors
    console.error("Error updating user location RoleHierarchy:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}
