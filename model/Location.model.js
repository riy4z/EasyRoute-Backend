import { ObjectId } from "mongodb";
import mongoose from "mongoose";

export const LocationSchema = new mongoose.Schema({
    Location : {type: String},
    CompanyID : {type : ObjectId},
    StreetAddress: {type : String},
    City : {type : String},
    State : {type : String},
    ZipCode : {type : Number} 
});

export default mongoose.model.Locations || mongoose.model('Locations', LocationSchema)