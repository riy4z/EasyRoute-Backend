import LocationModel from "./model/Location.model.js";

export async function getLocations(req, res) {
    try {
        const companyid = req.query.companyid;  // Change this line
        console.log(companyid);

        // Modify the query based on your database schema and logic
        const locations = await LocationModel.find({ CompanyID: companyid });
        
        res.send(locations);
    } catch (error) {
        console.error("Error fetching locations:", error);
        res.status(500).send("Internal Server Error");
    }
}

export async function AddLocations(req, res) {
    try {
        const { Location, CompanyID } = req.body;
        console.log(Location)
        // Check if the location already exists
        const existingLocation = await LocationModel.findOne({ Location });
    
        if (existingLocation) {
          return res.status(400).json({ error: 'Location already exists' });
        }
    
        // Create a new location
        const newLocation = new LocationModel({Location: Location, CompanyID: CompanyID });
        await newLocation.save();
    
        res.status(201).json({ message: 'Location added successfully', location: newLocation });
      } catch (error) {
        console.error('Error adding location:', error);
        res.status(500).json({ error: 'Internal server error' });
      }
    
}