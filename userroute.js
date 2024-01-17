import UserRouteModel from "./model/UserRoute.model.js";

// AddUserRoute function to store userId and routeId
export async function AddUserRoute(req, res) {
    try {
      // Extract userId and routeId from the request body or params
      const { userId, routeId } = req.body; // Assuming you are sending userId and routeId in the request body
  
      // Validate if userId and routeId are provided
      if (!userId || !routeId) {
        return res.status(400).json({ error: "UserId and RouteId are required" });
      }
  
      // Create a new UserRoute document
      const newUserRoute = new UserRouteModel({
        UserID: userId,
        RouteID: routeId,
      });
  
      // Save the document to the database
      await newUserRoute.save();
  
      
      res.status(201).json({ message: "User route added successfully" });
    } catch (error) {
     
      console.error("Error adding user route:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }
  
  // retrieve routes based on userId
  export async function GetUserRoutes(req, res) {
    try {
  
      const userId = req.query.userId; 

      if (!userId) {
        return res.status(400).json({ error: "UserId is required" });
      }
  
      // Fetch user routes based on userId
      const userRoutes = await UserRouteModel.find({ UserID: userId });
      // Send the user routes in the response
      res.status(200).json(userRoutes);
    } catch (error) {
      console.error("Error fetching user routes:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }

