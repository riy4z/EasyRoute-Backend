import { ObjectId } from "mongodb";
import mongoose from "mongoose";

export const RoleSchema = new mongoose.Schema({
    Role : {type: String},
    CompanyID: {type: ObjectId},
    // RoleHierarchy:{type: Number}
});

export default mongoose.model.Roles || mongoose.model('Roles', RoleSchema);
// // HI THERE