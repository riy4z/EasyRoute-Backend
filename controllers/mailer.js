import { EMAIL, PASSWORD,  } from '../controllers/env.js';
import brevo from '@getbrevo/brevo';
let defaultClient = brevo.ApiClient.instance;

let apiKey = defaultClient.authentications['api-key'];
apiKey.apiKey = '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';

let apiInstance = new brevo.TransactionalEmailsApi();
let sendSmtpEmail = new brevo.SendSmtpEmail();


export const registerMail = async (req,res) => {
    const {username, userEmail, text, subject} = req.body;

    sendSmtpEmail.subject =subject || "Registration Successful";
    const htmlContent = text || `<html><body><h1>Welcome to EasyRoute, ${username}!</h1></body></html>`;
    sendSmtpEmail.htmlContent = htmlContent;
    sendSmtpEmail.sender = { "name": "EasyRoute", "email": "easyroutea2z@gmail.com" };
    sendSmtpEmail.to = [
        { "email": `${userEmail}`, "name": `${username}` }
      ];

    sendSmtpEmail.replyTo = { "email": "easyroutea2z@gmail.com", "name": "EasyRoute Support" };
    sendSmtpEmail.headers = { "Some-Custom-Name": "unique-id-1234" };
    sendSmtpEmail.params = { "parameter": "My param value", "subject": "common subject" };
      
      
    apiInstance.sendTransacEmail(sendSmtpEmail).then(function (data) {
        console.log('API called successfully. Returned data: ' + JSON.stringify(data));
        return res.status(200).send({msg : "You should receive an email from us."})
      }, function (error) {
        console.error(error);
      });
    // var email = {
    //     body: {
    //         name : `${username}`,
    //         intro: text || "Welcome to EasyRoute!",
    //         outro: "Expecting you to visit here often"
    //     }
    // }

    // var emailBody = MailGenerator.generate(email);

    // let message = {
    //     from : "support@easyroute.com",
    //     to : "jriyazamd@gmail.com",
    //     subject : subject || "Signup Successful",
    //     html : emailBody
    // }

    // transporter.sendMail(message)
    // .then(() => {
    //     return res.status(200).send({msg : "You should receive an email from us."})
    // })
    // .catch(error => res.status(500).send({error}))
}