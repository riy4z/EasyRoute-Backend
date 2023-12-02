import mongoose from "mongoose";

export const CsvDetailsSchema = new mongoose.Schema({
    UserName: {type: String},
    FileName: {type: String},
    TotalCount: {type: Number},
    IsComplete: {type:Boolean},
    CreatedDateTime: {type: Date},
    LastModifiedDateTime: {type:Date},
  });

  export default mongoose.model.CsvDetails || mongoose.model('Csvdetails',CsvDetailsSchema)
