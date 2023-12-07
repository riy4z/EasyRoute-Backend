import { Router } from "express";
const router = Router(); 
import * as controller from '../controllers/appController.js';
import * as roles from "../roles.js";
import * as csvdetails from "../csvdetails.js"
import * as addressinfo from "../addressinfo.js"
import * as locations from "../locations.js"
import * as companys from "../companys.js"
import * as userlocations from "../userlocations.js"
import Auth, {localVariables} from '../middleware/auth.js';
import {registerMail} from '../controllers/mailer.js';

/**POST Methods */
router.route('/register').post(controller.register);;
router.route('/registerMail').post(registerMail);
router.route('/authenticate').post(controller.verifyUser,(req,res)=>res.end());
router.route('/login').post(controller.verifyUser,controller.login);
router.route('/store-address-data').post(addressinfo.StoreAddressData)
router.route('/addRoles').post(roles.AddRoles)
router.route('/processCSV').post(csvdetails.ProcessCSV)
router.route('/addLocations').post(locations.AddLocations);
router.route('/addUserLocation').post(userlocations.AddUserLocation)

/** GET Methods */
router.route('/user/:username').get(controller.getUser)
router.route('/generateOTP').get(controller.verifyUser,localVariables,controller.generateOTP)
router.route('/generateOTPbyEmail').get(localVariables,controller.generateOTPbyEmail)
router.route('/verifyOTP').get(controller.verifyUser,controller.verifyOTP)
router.route('/verifyOTPbyEmail').get(controller.verifyOTPbyEmail)
router.route('/createResetSession').get(controller.createResetSession)
router.route('/get-address-data').get(addressinfo.GetAddressData)
router.route('/getRoles').get(roles.getRoles)
router.route('/getCompanys').get(companys.getCompanys)
router.route('/getLocations').get(locations.getLocations)
router.route('/getUserLocations').get(userlocations.GetUserLocations)

/** PUT Methods */
router.route('/updateuser').put(Auth,controller.updateUser);
router.route('/resetPassword').put(controller.verifyUser,controller.resetPassword);


/*PATCH Methods */
router.route('/update-address-data/:id').patch(addressinfo.UpdateAddressData)
export default router;
//



