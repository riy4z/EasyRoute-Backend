import UserModel from "./model/User.model.js";


export async function getUsersByCompany(req, res) {
    try {
        const companyId = req.query.companyId;

        
        const users = await UserModel.find({ CompanyID: companyId });

        res.send(users);
    } catch (error) {
        console.error("Error fetching users by CompanyID:", error);
        res.status(500).send("Internal Server Error");
    }
}

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

