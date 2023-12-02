import CompanyModel from "./model/Company.model.js";

export async function getCompanys(req, res) {
    try {
        const companies = await CompanyModel.find({});
        res.send(companies);
    } catch (error) {
        console.error("Error fetching roles:", error);
        res.status(500).send("Internal Server Error");
    }
}