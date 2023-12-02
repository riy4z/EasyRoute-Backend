import CsvdetailsModel from "./model/Csvdetails.model.js";

export async function ProcessCSV(req, res) {
    const csvData = req.body.csvData;
    const fileName = req.body.fileName;
    const username = req.body.username; // Get the username from the request body
  
    try {
      const newCsvDetails = new CsvdetailsModel({
        UserName: username,
        FileName: fileName,
        TotalCount: csvData.length,
        IsComplete: true,
        CreatedDateTime: new Date(),
        LastModifiedDateTime: new Date(),
      });
  
      await newCsvDetails.save();
  
      res.json({ success: true, details: newCsvDetails });
    } catch (error) {
      console.error('Error processing CSV data:', error);
      res.status(500).json({ success: false, error: 'Internal server error' });
    }
    
}