import FollowUpModel from "./model/FollowUpModel.model.js";

export async function saveFollowUp(req, res) {
    try {
      const { addressId, followUp, userID, companyID } = req.body;
  
      if (!addressId || !followUp || !userID || !companyID) {
        return res.status(400).json({ error: 'AddressId and FollowUp are required' });
      }
  
      // Find an existing follow-up record for the given addressId
      const existingFollowUp = await FollowUpModel.findOne({ addressId });
  
      if (existingFollowUp) {
        // If an existing follow-up record is found, update its followUp field
        existingFollowUp.followUp = followUp;
        await existingFollowUp.save();
      } else {
        // If no existing follow-up record is found, create a new one
        const newFollowUp = new FollowUpModel({
          addressId,
          userID,
          companyID,
          followUp,
        });
        await newFollowUp.save();
      }
  
      res.status(201).json({ message: 'Follow-up data saved successfully' });
    } catch (error) {
      console.error('Error saving follow-up data:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }

  export async function getFollowUpsByCompany(req, res) {
    try {
      const { companyId } = req.query;
  
      if (!companyId) {
        return res.status(400).json({ error: 'CompanyID is required as a query parameter' });
      }
  
      // Find all follow-up records for the given companyID
      const followUps = await FollowUpModel.find({ companyID: companyId });
  
      res.status(200).json({ followUps });
    } catch (error) {
      console.error('Error fetching follow-up data:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }
