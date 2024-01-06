import mongoose from "mongoose";

export const CompanySchema = new mongoose.Schema({
   CompanyName: { type: String, unique: true },
   URL: { type: String, unique: true }
});

export default mongoose.model.Companys || mongoose.model('Companys', CompanySchema);
