import mongoose from "mongoose";

const CheckInSchema = new mongoose.Schema({
  addressId: { type: mongoose.Schema.Types.ObjectId, required: true },
  userID: { type: mongoose.Schema.Types.ObjectId, required: true },
  companyID: { type: mongoose.Schema.Types.ObjectId, required: true },
  locationID: { type: mongoose.Schema.Types.ObjectId, required: true },
  meetingNotes: { type: String, required: true },
  createdAt: { type: Date, default: Date.now } 
});

export default mongoose.model.CheckIns || mongoose.model("CheckIns", CheckInSchema);
