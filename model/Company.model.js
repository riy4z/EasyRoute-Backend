import mongoose from "mongoose";

export const CompanySchema = new mongoose.Schema({
   Company:{type : String}
})

export default mongoose.model.Companys || mongoose.model('Companys', CompanySchema);
