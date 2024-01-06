import bcrypt from "bcrypt";
import AccessRequest from "./model/AccessRequest.model.js";
import CompanyModel from "./model/Company.model.js";
import UserModel from "./model/User.model.js";

export async function SaveRequest(req, res) {
    try {
        const userData = req.body;

        // Check if there is a password in the request body
        if (userData.password) {
            // Hash the password using bcrypt
            const hashedPassword = await bcrypt.hash(userData.password, 10);

            // Update the userData with the hashed password
            userData.password = hashedPassword;
        }

        // Check if a company with the same name or URL already exists
        const existingCompany = await AccessRequest.findOne({
            $or: [
                { companyName: userData.companyName },
                { companyURL: userData.companyURL },
            ],
        });

        if (existingCompany) {
            return res.status(400).json({ error: 'Company with the same name or URL already exists' });
        }

            // Save in the database if it's a new request
            const newAccessRequest = new AccessRequest(userData);
            await newAccessRequest.save();

            res.status(200).json({ message: 'Access request saved successfully' });
        
    } catch (error) {
        console.error('Error saving data:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

export async function updateAccessRequest(req, res) {
    const userData = req.body;
    try {
        const existingRequest = await AccessRequest.findById(userData._id);

        if (!existingRequest) {
            return res.status(404).json({ error: 'Access request not found' });
        }

        // Update only notes and approval status
        existingRequest.notes = userData.notes;
        existingRequest.approved = userData.approved;

        await existingRequest.save();

        res.status(200).json({ message: 'Access request updated successfully' });
    } catch (error) {
        console.error('Error updating access request:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

export async function FetchRequests(req, res) {
    try {
        // Fetch all access requests from the database
        const accessRequests = await AccessRequest.find();

        res.status(200).json(accessRequests);
    } catch (error) {
        console.error('Error fetching data:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}


export async function createCompany(req, res) {
    try {
      const { Company, URL } = req.body;
  
      // Validate required fields
      if (!Company || !URL) {
        return res.status(400).send("Both Company and URL are required.");
      }
  
      // Create a new CompanyModel instance
      const newCompany = new CompanyModel({
        CompanyName: Company,
        URL,
      });
  
      // Save the new company to the database
      await newCompany.save();

      // Send the saved company data in the response
      res.status(201).json({
        message: "Company created successfully.",
        company: newCompany,
      });
    } catch (error) {
      console.error("Error creating company:", error);
      res.status(500).send("Internal Server Error");
    }
}

export async function registerCorporateUser(req, res) {
    try {
        const {firstname, lastname, username, password, profile, email, companyId, role, mobile, address } = req.body;
        console.log(role)
        // Check for existing username
        const existingUsername = await UserModel.findOne({ username });
        if (existingUsername) {
            return res.status(400).json({ error: 'Please use a unique username' });
        }

        // Check for existing email
        const existingEmail = await UserModel.findOne({ email });
        if (existingEmail) {
            return res.status(400).json({ error: 'Please use a unique email' });
        }

        if (password) {
            const user = new UserModel({
                firstName: firstname,
                lastName: lastname,
                username,
                password: password,
                profile: profile || '',
                email,
                mobile,
                CompanyID: companyId || null, // Set to null if not provided
                RoleHierarchy: role , // Set to default if not provided
                address: address
            });
            console.log(user);
            // Save the user to the database
            const result = await user.save();
            return res.status(201).json({ msg: 'User registered successfully', result });
        } else {
            return res.status(400).json({ error: 'Password is required' });
        }
    } catch (error) {
        console.error('Error:', error);
        return res.status(500).json({ error: 'Internal server error' });
    }
}

  