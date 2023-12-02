import mongoose, { model } from "mongoose";
import { ObjectId } from "mongodb";

export const addressSchema = new mongoose.Schema({
    "First Name": String,
    "Last Name": String,
    "Street Address": String,
    "City": String,
    "State": String,
    "ZIP Code": String,
    "longitude": Number,
    "latitude": Number,
    "isHidden": { type: Boolean, default: false },
    "CompanyID": {type: ObjectId},
    "LocationID": {type: ObjectId}
});

addressSchema.index({ "First Name": 1, "Last Name": 1, "Street Address":1, "City": 1,"State":1, "ZIP Code": 1 }, { unique: true });

export default mongoose.model.AddressInfo || mongoose.model('AddressInfo', addressSchema)
