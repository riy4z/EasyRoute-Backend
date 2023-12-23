import { ObjectId } from "mongodb";
import mongoose from "mongoose";

export const UserRouteSchema = new mongoose.Schema({
    UserID : {type : ObjectId},
    RouteID : {type: ObjectId},
});

export default mongoose.model.UserRoutes || mongoose.model('UserRoutes', UserRouteSchema) 

