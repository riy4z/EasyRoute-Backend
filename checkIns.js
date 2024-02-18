import CheckInModel from "./model/CheckIn.model.js";
import AddressInfo from "./model/AddressInfo.model.js";
import UserModel from "./model/User.model.js";
import LocationModel from "./model/Location.model.js";
import CompanyModel from "./model/Company.model.js";

export async function AddCheckIn(req, res) {
  try {
    const { addressId, meetingNotes, userID, companyID, locationID } = req.body;

    if (!addressId || !meetingNotes || !userID || !companyID ) {
      return res.status(400).json({ error: "AddressId and MeetingNotes are required" });
    }

    const newCheckIn = new CheckInModel({
      addressId,
      userID,
      companyID,
      locationID,
      meetingNotes,
      createdAt: new Date(), 
    });

    await newCheckIn.save();

    res.status(201).json({ message: "Check-in added successfully" });
  } catch (error) {
    console.error("Error adding check-in:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

export async function getMeetingNotesAndHistory(req, res) {
  try {
      const addressId = req.query.addressId;
      const historyData = await CheckInModel.find({ addressId });
      res.send(historyData);
  } catch (error) {
      console.error("Error fetching meeting notes and history:", error);
      res.status(500).send("Internal Server Error");
  }
}

export async function exportCheckin(req, res){
  const { startDate, endDate, locationId } = req.body;
  console
  try {
    // Query check-ins between the selected dates and for the specified location
    const checkIns = await CheckInModel.find({
      locationID: locationId,
      createdAt: { $gte: startDate, $lte: endDate }
    });

    // Convert check-ins to CSV format
    const csvData = await generateCSV(checkIns, locationId);

    // Set response headers
    res.setHeader('Content-Type', 'text/csv');
    res.setHeader('Content-Disposition', `attachment; filename=checkin_report.csv`);

    // Send CSV data
    res.send(csvData);
  } catch (error) {
    console.error('Error exporting check-in data:', error);
    res.status(500).send('Internal Server Error');
  }
}

async function generateCSV(checkIns, locationId) {
  let csv = '';

  try {
    const locationID = await LocationModel.findById(locationId);
    const companyID = await CompanyModel.findById(locationID.CompanyID);

    for (const checkIn of checkIns) {
      const address = await AddressInfo.findById(checkIn.addressId);
      const user = await UserModel.findById(checkIn.userID);

      if (!user || !address) {
        // If user or address not found, skip this check-in
        continue;
      }

      const addressFirstName = address.get('First Name');
      const addressLastName = address.get('Last Name');
      const addressStreet = address.get('Street Address');
      const addressCity = address.get('City');
      const addressState = address.get('State');
      const addressZipCode = address.get('ZIP Code');
      const userFirstName = user.get('firstName');
      const userLastName = user.get('lastName');

      const row = [
        `${addressFirstName} ${addressLastName}`,
        `${userFirstName} ${userLastName}`,
        `${addressStreet}`,
        `${addressCity}`,
        `${addressState}`,
        `${addressZipCode}`,
        companyID.CompanyName,
        locationID.Location,
        `"${checkIn.meetingNotes.replace(/"/g, '""')}"`,
        checkIn.createdAt.toISOString()
      ];

      // Check if any field in the row is empty
      if (row.some(field => !field.trim())) {
        continue; // Skip the iteration if any field is empty
      }

      csv += row.join(',') + '\n'; // Add the row data
    }
  } catch (error) {
    console.error('Error processing check-ins:', error);
    // Handle errors
  }

  return csv;
}



