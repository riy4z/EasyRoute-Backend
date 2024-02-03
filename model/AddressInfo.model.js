import mongoose, { model } from "mongoose";
import { ObjectId } from "mongodb";

export const addressSchema = new mongoose.Schema({
    "First Name": String,
    "Last Name": String,
    "Phone": { type: Number, default: "" },
    "Email": { type: String, default: "" },
    "Street Address": String,
    "City": String,
    "State": String,
    "ZIP Code": String,
    "longitude": Number,
    "latitude": Number,
    "isHidden": { type: Boolean, default: false },
    "CompanyID": { type: mongoose.Schema.Types.ObjectId },
    "LocationID": { type: mongoose.Schema.Types.ObjectId },
    "markerId": { type: String },
});


addressSchema.index({ "First Name": 1, "Last Name": 1, "Street Address":1, "City": 1,"State":1, "ZIP Code": 1, "LocationID": 1, "Phone":1,"Email":1}, { unique: true });

export default mongoose.model.AddressInfo || mongoose.model('AddressInfo', addressSchema)
