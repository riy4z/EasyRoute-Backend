import LocationModel from "./model/Location.model.js";


export async function getLocations(req, res) {
    try {
        const companyid = req.query.companyid;
        console.log(companyid);

        const locations = await LocationModel.find({ CompanyID: companyid });
        
        res.send(locations);
    } catch (error) {
        console.error("Error fetching locations:", error);
        res.status(500).send("Internal Server Error");
    }
}

export async function AddLocations(req, res) {
    try {
        const { Location, CompanyID, StreetAddress, City, State, ZipCode } = req.body;
        console.log(Location);

        const existingLocation = await LocationModel.findOne({ Location, CompanyID });
    
        if (existingLocation) {
            return res.status(400).json({ error: 'Location already exists' });
        }
    
        const newLocation = new LocationModel({
            Location: Location,
            CompanyID: CompanyID,
            StreetAddress: StreetAddress,
            City: City,
            State: State,
            ZipCode: ZipCode
        });

        await newLocation.save();
    
        res.status(201).json({ message: 'Location added successfully', location: newLocation });
    } catch (error) {
        console.error('Error adding location:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}

export async function getLocationById(req, res) {
    try {
        const locationId = req.params.locationId;  // Assuming you pass the location ID in the request parameters
        console.log(locationId)
        const location = await LocationModel.findById(locationId);
        
        if (!location) {
            return res.status(404).json({ error: 'Location not found' });
        }

        res.send(location);
    } catch (error) {
        console.error('Error fetching location by ID:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}
