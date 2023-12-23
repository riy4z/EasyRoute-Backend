import { ObjectId } from "mongodb";
import mongoose from "mongoose";

export const RouteSchema = new mongoose.Schema({
    Route: {
        type: [
            {
                position: {
                    lat: { type: Number, required: true },
                    lng: { type: Number, required: true },
                },
            }
        ],
        required: true,
    },
    
    CompanyID: {type: ObjectId, required: true},
    LocationID: {type: ObjectId},
    RouteName: { type: String, required: true },

});

// export default mongoose.model.Routes || mongoose.model('Routes', RouteSchema);
export default mongoose.model('Routes', RouteSchema);