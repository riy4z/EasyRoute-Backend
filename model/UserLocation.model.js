import { ObjectId } from "mongodb";
import mongoose from "mongoose";

export const UserLocationSchema = new mongoose.Schema({
    UserID : {type : ObjectId},
    LocationID : {type: ObjectId},
});

export default mongoose.model.UserLocations || mongoose.model('UserLocations', UserLocationSchema)