import { ObjectId } from "mongodb";
import mongoose from "mongoose";

export const LocationSchema = new mongoose.Schema({
    Location : {type: String},
    CompanyID : {type : ObjectId}
});

export default mongoose.model.Locations || mongoose.model('Locations', LocationSchema)