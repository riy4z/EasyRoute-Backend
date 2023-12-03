import AddressInfo from "./model/AddressInfo.model.js";

//To store data in AddressInfo
  export async function StoreAddressData(req,res){
    try {
        const data = req.body;
        const savedData = new AddressInfo(data);
        await savedData.save();
        res.status(201).json({ message: 'Address data saved successfully' });
      } catch (error) {
        if (error.code === 11000) {
          res.status(400).json({ error: 'Duplicate value found in unique field' });
        } else {
          res.status(500).json({ error: 'Error saving address data' });
        }
      }
  }

  // Define a route to update addressData by ID
  export async function UpdateAddressData(req,res){
    const { id } = req.params;
    const updatedData = req.body;
  
    try {
      const addressData = await AddressInfo.findByIdAndUpdate(id, updatedData, { new: true });
  
      if (addressData) {
        res.status(200).json(addressData);
      } else {
        res.status(404).json({ message: 'Address data not found' });
      }
    } catch (error) {
      res.status(500).json({ error: 'Error updating address data' });
    }
  }
  
  // Define a route to retrieve addressData
  export async function GetAddressData(req,res){
    try {
        const addressData = await AddressInfo.find({});
        if (addressData && addressData.length > 0) {
          res.setHeader('Content-Type', 'application/json');
          res.status(200).json(addressData);
        } else {
          res.status(404).json({ message: 'No address data found' });
        }
      } catch (error) {
        res.status(500).json({ error: 'Error retrieving address data' });
      }
  }