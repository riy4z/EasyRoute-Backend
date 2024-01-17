import mongoose from "mongoose";

const FollowUpSchema = new mongoose.Schema({
  addressId: { type: String, required: true },
  userID: { type: mongoose.Schema.Types.ObjectId, required: true },
  companyID: { type: mongoose.Schema.Types.ObjectId, required: true },
  followUp: { type: Date, required: true },
});

export default mongoose.model.FollowUps || mongoose.model("FollowUps", FollowUpSchema);
