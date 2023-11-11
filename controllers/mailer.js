import nodemailer from 'nodemailer';
import Mailgen from 'mailgen';
// import ENV from '../config.js';
import { EMAIL, PASSWORD } from '../controllers/env.js';


let nodeConfig = {
    service: "gmail",
    auth: {
    user: EMAIL,
    pass: PASSWORD
 },
}

let transporter = nodemailer.createTransport(nodeConfig);

let MailGenerator = new Mailgen({
    theme:"default",
    product:{
        name:"EasyRoute",
        link:"https://mailgen.js"
    }
})

/** POST: localhost:4000/api/registerMail 
 * @param: {
  "username" : "example123",
  "userEmail" : "admin123",
  "text" : "",
  "subject" : ""
}
*/
export const registerMail = async (req,res) => {
    const {username, userEmail, text, subject} = req.body;

    var email = {
        body: {
            name : `${username}`,
            intro: text || "Welcome to EasyRoute!",
            outro: "Expecting you to visit here often"
        }
    }

    var emailBody = MailGenerator.generate(email);

    let message = {
        from : EMAIL,
        to : userEmail,
        subject : subject || "Signup Successful",
        html : emailBody
    }

    transporter.sendMail(message)
    .then(() => {
        return res.status(200).send({msg : "You should receive an email from us."})
    })
    .catch(error => res.status(500).send({error}))
}