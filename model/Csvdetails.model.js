import { ObjectId } from "mongodb";
import mongoose from "mongoose";

export const CsvDetailsSchema = new mongoose.Schema({
    UserID: {type: ObjectId},
    FileName: {type: String},
    TotalCount: {type: Number},
    IsComplete: {type:Boolean},
    CreatedDateTime: {type: Date},
    LastModifiedDateTime: {type:Date},
  });

  export default mongoose.model.CsvDetails || mongoose.model('Csvdetails',CsvDetailsSchema)
