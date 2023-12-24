import RoutesModel from "./model/Route.model.js";
import UserRouteModel from "./model/UserRoute.model.js";

// Save 
export async function saveRoute(req, res) {
    try {
        const { Route, CompanyID, LocationID, RouteName } = req.body;
        console.log(Route, CompanyID, LocationID, RouteName);

        // Create a new route
        const newRoute = new RoutesModel({ Route, CompanyID, LocationID, RouteName });
        const savedRoute = await newRoute.save();

        res.status(201).json({ message: 'Route saved successfully', route: savedRoute });
    } catch (error) {
        if (error.name === 'ValidationError') {
            console.error('Validation Error:', error.message);
            res.status(400).json({ error: error.message });
        } else {
            console.error('Error saving route:', error);
            res.status(500).json({ error: 'Internal server error' });
        }
    }
}
// Update 
export async function updateRoute(req, res) {
    try {
        const routeId = req.query.routeId;
        const { Route, CompanyID, LocationID, RouteNumber } = req.body;
        console.log(routeId, Route, CompanyID, LocationID, RouteNumber);
       
        const updatedRoute = await RoutesModel.find(routeId, { Route, CompanyID, LocationID, RouteNumber }, { new: true });

        if (!updatedRoute) {
            return res.status(404).json({ error: 'Route not found' });
        }

        res.status(200).json({ message: 'Route updated successfully', route: updatedRoute });
    } catch (error) {
        console.error('Error updating route:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}

// Delete 
export async function deleteRoute(req, res) {
    try {
        const routeId = req.params.id;
        console.log(routeId);
       
        const deletedRoute = await RoutesModel.deleteOne({_id:routeId});
        const deletedUserRoute = await UserRouteModel.deleteOne({RouteID:routeId});

        if (!deletedRoute||!deletedUserRoute) {
            return res.status(404).json({ error: 'Route not found' });
        }

        res.status(200).json({ message: 'Route deleted successfully', route: deletedRoute });
    } catch (error) {
        console.error('Error deleting route:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}


// Fetch by ID
export async function getRouteById(req, res) {
    try {
        const routeId = req.params.routeId;
        console.log(routeId);

        const foundRoute = await RoutesModel.findById(routeId);

        if (!foundRoute) {
            return res.status(404).json({ error: 'Route not found' });
        }

        res.status(200).json({ message: 'Route fetched successfully', route: foundRoute });
    } catch (error) {
        console.error('Error fetching route:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}
