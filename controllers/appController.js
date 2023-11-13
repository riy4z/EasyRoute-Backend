import UserModel from "../model/User.model.js";
import bcrypt from 'bcrypt';
import jwt from "jsonwebtoken";
import otpGenerator from 'otp-generator';
import ENV from '../config.js';


// export async function verifyEmail(req, res,next) {
//     try {
        
//         const { email } = req.method == "GET" ? req.query : req.body;

//         // check the user existance
//         let exist = await UserModel.findOne({ email });
//         if(exist) return res.status(404).send({msg : 'User Exists'})
//         if(!exist) return res.status(201).send({ error : "Can't find User!"});
//         next();

//     } catch (error) {
//         return res.status(404).send({ error: "Authentication Error"});
//     }
// }

/** middleware for verify user */
export async function verifyUser(req, res, next){
    try {
        
        const { username } = req.method == "GET" ? req.query : req.body;

        // check the user existance
        let exist = await UserModel.findOne({ username });
        if(!exist) return res.status(404).send({ error : "Can't find User!"});
        next();

    } catch (error) {
        return res.status(404).send({ error: "Authentication Error"});
    }
}

/** POST: localhost:4000/api/register 
 * @param : {
  "username" : "example123",
  "password" : "admin123",
  "email": "example@gmail.com",
  "firstName" : "bill",
  "lastName": "william",
  "mobile": 8009860560,
  "address" : "Apt. 556, Kulas Light, Gwenborough",
  "profile": ""
}
*/

export async function register(req, res) {
    try {
        const { username, password, profile, email } = req.body;

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
            const hashedPassword = await bcrypt.hash(password, 10);
            const user = new UserModel({
                username,
                password: hashedPassword,
                profile: profile || '',
                email,
            });

            // Save the user to the database
            const result = await user.save();
            return res.status(201).json({ msg: 'User registered successfully', result});
        } else {
            return res.status(400).json({ error: 'Password is required' });
        }
    } catch (error) {
        console.error('Error:', error);
        return res.status(500).json({ error: 'Internal server error' });
    }
}


/** POST: localhost:4000/api/login 
 * @param: {
  "username" : "example123",
  "password" : "admin123"
}
*/
export async function login(req,res){
   
    const { username, password } = req.body;

    try {
        
        UserModel.findOne({ username })
            .then(user => {
                bcrypt.compare(password, user.password)
                    .then(passwordCheck => {

                        if(!passwordCheck) return res.status(400).send({ error: "Don't have Password"});

                        // create jwt token
                        const token = jwt.sign({
                                        userId: user._id,
                                        username : user.username
                                    }, ENV.JWT_SECRET, {expiresIn : "24h"});

                        return res.status(200).send({
                            msg: "Login Successful...!",
                            username: user.username,
                            token
                        });                                    

                    })
                    .catch(error =>{
                        return res.status(400).send({ error: "Password does not Match"})
                    })
            })
            .catch( error => {
                return res.status(404).send({ error : "Username not Found"});
            })

    } catch (error) {
        return res.status(500).send({ error});
    }
}

/** GET: localhost:4000/api/user/example123 */
export async function getUser(req, res) {
    try {
        const { username } = req.params;

        if (!username) {
            return res.status(400).json({ error: "Invalid Username" });
        }

        const user = await UserModel.findOne({ username });

        if (!user) {
            return res.status(404).json({ error: "User Not Found" });
        }

        const { password, ...rest } = user.toObject();
        return res.status(200).json(rest);
    } catch (error) {
        console.error("Unexpected error:", error);
        return res.status(500).json({ error: "Internal Server Error" });
    }
}

/** PUT: localhost:4000/api/updateuser 
 * @param: {
  "header" : "<token>"
}
body: {
    firstName: '',
    address : '',
    profile : ''
}
*/
export async function updateUser(req, res) {
    try {
        // const userId = req.query.id; // Assuming the userId is passed as a query parameter
          const {userId} = req.user;
        if (userId) {
            const body = req.body;

            // Update the data
            await UserModel.updateOne({ _id: userId }, body).exec();

            return res.status(200).send({ msg: "Record Updated...!" });
        } else {
            return res.status(400).send({ error: "User ID not provided" });
        }
    } catch (error) {
        console.error("Unexpected error:", error);
        return res.status(500).send({ error: "Internal Server Error" });
    }
}

/** GET: localhost:4000/api/generateOTP */
export async function generateOTP(req,res){
    req.app.locals.OTP = await otpGenerator.generate(6, { lowerCaseAlphabets: false, upperCaseAlphabets: false, specialChars: false})
    res.status(201).send({code: req.app.locals.OTP})
}
export async function generateOTPbyEmail(req,res){
req.app.locals.OTP = await otpGenerator.generate(6, { lowerCaseAlphabets: false, upperCaseAlphabets: false, specialChars: false})
    res.status(201).send({code: req.app.locals.OTP})
}

/** GET: localhost:4000/api/verifyOTP */
export async function verifyOTP(req,res){
    const {code} = req.query;
    if(parseInt(req.app.locals.OTP) === parseInt(code)){
      req.app.locals.OTP = null;
      req.app.locals.resetSession = true;
      return res.status(201).send({msg : "Verified Successfully!"})

    }
    return res.status(400).send({error : "Invalid OTP"});
}
export async function verifyOTPbyEmail(req,res){
    const {code} = req.query;
    if(parseInt(req.app.locals.OTP) === parseInt(code)){
      req.app.locals.OTP = null;
      req.app.locals.resetSession = true;
      return res.status(201).send({msg : "Verified Successfully!"})

    }
    return res.status(400).send({error : "Invalid OTP"});
}

/** GET: localhost:4000/api/createResetSession */
export async function createResetSession(req,res){
    if(req.app.locals.resetSession){
        return res.status(201).send({flag : req.app.locals.resetSession})
    }
    return res.status(440).send({error : "Session Expired!"})
}

/** PUT: localhost:4000/api/resetPassword */
export async function resetPassword(req, res) {
    try {
        if (!req.app.locals.resetSession) {
            return res.status(440).send({ error: "Session expired!" });
        }

        const { username, password } = req.body;

        const user = await UserModel.findOne({ username });

        if (!user) {
            return res.status(404).send({ error: "Username not found" });
        }

        try {
            const hashedPassword = await bcrypt.hash(password, 10);
            await UserModel.updateOne({ username: user.username }, { password: hashedPassword });
            req.app.locals.resetSession = false; // reset session
            return res.status(201).send({ msg: "Record Updated...!" });
        } catch (error) {
            console.error("Error:", error);
            return res.status(500).send({ error: "Unable to hash password" });
        }
    } catch (error) {
        console.error("Unexpected error:", error);
        return res.status(401).send({ error });
    }
}


