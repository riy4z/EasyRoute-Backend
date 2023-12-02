import { Router } from "express";
const router = Router(); 
import * as controller from '../controllers/appController.js';
import * as roles from "../roles.js";
import * as csvdetails from "../csvdetails.js"
import * as companys from "../companys.js"
import Auth, {localVariables} from '../middleware/auth.js';
import {registerMail} from '../controllers/mailer.js';

/**POST Methods */
router.route('/register').post(controller.register);;
router.route('/registerMail').post(registerMail);
router.route('/authenticate').post(controller.verifyUser,(req,res)=>res.end());
router.route('/login').post(controller.verifyUser,controller.login);
router.route('/addRoles').post(roles.AddRoles)
router.route('/processCSV').post(csvdetails.ProcessCSV)

/** GET Methods */
router.route('/user/:username').get(controller.getUser)
router.route('/generateOTP').get(controller.verifyUser,localVariables,controller.generateOTP)
router.route('/generateOTPbyEmail').get(localVariables,controller.generateOTPbyEmail)
router.route('/verifyOTP').get(controller.verifyUser,controller.verifyOTP)
router.route('/verifyOTPbyEmail').get(controller.verifyOTPbyEmail)
router.route('/createResetSession').get(controller.createResetSession)
router.route('/getRoles').get(roles.getRoles)
router.route('/getCompanys').get(companys.getCompanys)

/** PUT Methods */
router.route('/updateuser').put(Auth,controller.updateUser);
router.route('/resetPassword').put(controller.verifyUser,controller.resetPassword);

export default router;
// 