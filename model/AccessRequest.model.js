import mongoose from "mongoose";

const accessRequestSchema = new mongoose.Schema({
  companyName: {
    type: String,
    unique: true,
  },
  companyURL: {
    type: String,
    unique: true,
  },
  firstName: String,
  lastName: String,
  adminEmail: String,
  username: String,
  password: String,
  mobile: Number,
  address: String,
  city: String,
  country: String,
  state: String,
  zipcode: String,
  agreeToTerms: Boolean,
  notes: {type:String, default: ""},
  approved: {
    type:Number,
    default: 0
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const AccessRequest = mongoose.model('AccessRequest', accessRequestSchema);

export default AccessRequest;
