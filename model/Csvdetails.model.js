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

//   export const RoleSchema = new mongoose.Schema({
//     Role : {type: String},
//     CompanyID: {type: ObjectId}
// });

// export default mongoose.model.Roles || mongoose.model('Roles', RoleSchema); 