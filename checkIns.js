import CheckInModel from "./model/CheckIn.model.js";

export async function AddCheckIn(req, res) {
  try {
    const { addressId, meetingNotes, userID, companyID } = req.body;

    if (!addressId || !meetingNotes || !userID || !companyID ) {
      return res.status(400).json({ error: "AddressId and MeetingNotes are required" });
    }

    const newCheckIn = new CheckInModel({
      addressId,
      userID,
      companyID,
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