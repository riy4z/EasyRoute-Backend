import mongoose from "mongoose";
import { ObjectId } from "mongodb";

const FollowUpSchema = new mongoose.Schema({
  addressId: { type: String, required: true },
  userID: { type: mongoose.Schema.Types.ObjectId, required: true },
  companyID: { type: mongoose.Schema.Types.ObjectId, required: true },
  followUp: { type: Date, required: true },
  LocationID: {type:ObjectId, required: true}
});

export default mongoose.model.FollowUps || mongoose.model("FollowUps", FollowUpSchema);
