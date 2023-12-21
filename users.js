import UserModel from "./model/User.model.js";


export async function getUsersByCompany(req, res) {
    try {
        const companyId = req.query.companyId;

        
        const users = await UserModel.find({ CompanyID: companyId });

        res.send(users);
    } catch (error) {
        console.error("Error fetching users by CompanyID:", error);
        res.status(500).send("Internal Server Error");
    }
}
