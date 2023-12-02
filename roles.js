import RoleModel from "./model/Role.model.js";


// Get Roles by RoleID
export async function getRoles(req, res) {
    try {
        const companyid = req.query.companyid;  // Change this line
        console.log(companyid);

        // Modify the query based on your database schema and logic
        const roles = await RoleModel.find({ CompanyID: companyid });
        
        res.send(roles);
    } catch (error) {
        console.error("Error fetching roles:", error);
        res.status(500).send("Internal Server Error");
    }
}

export async function AddRoles(req, res) {
    try {
        const { Role, CompanyID } = req.body;
        console.log(Role)
        // Check if the role already exists
        const existingRole = await RoleModel.findOne({ Role });
    
        if (existingRole) {
          return res.status(400).json({ error: 'Role already exists' });
        }
    
        // Create a new role
        const newRole = new RoleModel({Role: Role, CompanyID: CompanyID });
        await newRole.save();
    
        res.status(201).json({ message: 'Role added successfully', role: newRole });
      } catch (error) {
        console.error('Error adding role:', error);
        res.status(500).json({ error: 'Internal server error' });
      }
    
}


