import UserModel from "./model/User.model.js";
import { ObjectId } from "mongodb";



// Update User Role Hierarchy 
export async function UpdateUserRoleHierarchy(req, res) {
  try {
    // Extract UserID and newRoleHierarchy from the request body or params
    const { UserID, newRoleHierarchy } = req.body; // Assuming you are sending UserID and newRoleHierarchy in the request body

    // Validate if UserID and newRoleHierarchy are provided
    if (!UserID || !newRoleHierarchy) {
      return res.status(400).json({ error: "UserID and newRoleHierarchy are required" });
    }

    // Find the User document to update
    const user = await UserModel.findOne({ _id: UserID });

    // Check if the user exists
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Update the RoleHierarchy with newRoleHierarchy
    user.RoleHierarchy = newRoleHierarchy;

    // Save the updated document to the database
    await user.save();

    // Send a success response
    res.status(200).json({ message: "User role hierarchy updated successfully", user });
  } catch (error) {
    // Handle errors
    console.error("Error updating user role hierarchy:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

export async function getUserById(req, res) {
  try {
      const userId = req.params.userId;
      console.log('userId:', userId);

      const user = await UserModel.findOne({ _id: userId });

      if (!user) {
          return res.status(404).send("User not found");
      }

      res.send(user);
  } catch (error) {
      console.error("Error fetching user by ID:", error);
      res.status(500).send("Internal Server Error");
  }
}


export async function UpdateUser(req,res){
  const { id } = req.params;
  const updatedData = req.body;

  try {
    const userData = await UserModel.findByIdAndUpdate(id, updatedData, { new: true });

    if (userData) {
      res.status(200).json(userData);
    } else {
      res.status(404).json({ message: 'Address data not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Error updating address data' });
  }
}
