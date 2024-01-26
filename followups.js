import FollowUpModel from "./model/FollowUpModel.model.js";

export async function saveFollowUp(req, res) {
    try {
      const { addressId, followUp, userID, companyID, LocationID } = req.body;
  
      if (!addressId || !followUp || !userID || !companyID || !LocationID) {
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
          LocationID
        });
        await newFollowUp.save();
      }
  
      res.status(201).json({ message: 'Follow-up data saved successfully' });
    } catch (error) {
      console.error('Error saving follow-up data:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }

  export async function getFollowUpsByLocation(req, res) {
    try {
      const { locationId } = req.query;
  
      if (!locationId) {
        return res.status(400).json({ error: 'LocationID is required as a query parameter' });
      }
  
      // Find all follow-up records for the given companyID
      const followUps = await FollowUpModel.find({ LocationID: locationId });
  
      res.status(200).json({ followUps });
    } catch (error) {
      console.error('Error fetching follow-up data:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }

  export async function getFollowUpsByAddressId(req, res) {
    try {

      const { addressId } = req.query;
     
      if (!addressId) {
        return res.status(400).json({ error: 'CompanyID is required as a query parameter' });
      }
  
      // Find all follow-up records for the given companyID
      const followUps = await FollowUpModel.find({ addressId: addressId });
  
      res.status(200).json({ followUps });
    } catch (error) {
      console.error('Error fetching follow-up data:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }

  export async function UpdateFollowUp(req,res){
    const {id}  = req.params;
    const updatedData = req.body;
  
    try {
      const addressData = await FollowUpModel.findOneAndUpdate({addressId:id}, updatedData, { new: true });
  
      if (addressData) {
        res.status(200).json(addressData);
      } else {
        res.status(404).json({ message: 'Address data not found' });
      }
    } catch (error) {
      res.status(500).json({ error: 'Error updating address data' });
    }
  }


  export async function deleteFollowUp(req, res) {
    try {
        const addressId = req.params.addressId;
       
        const deletedRoute = await FollowUpModel.deleteOne({addressId:addressId});

        if (!deletedRoute) {
            return res.status(404).json({ error: 'Route not found' });
        }

        res.status(200).json({ message: 'Route deleted successfully', route: deletedRoute });
    } catch (error) {
        console.error('Error deleting route:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}
