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
import * as users from '../users.js'
import * as routes from "../routes.js";
import * as userroutes from "../userroute.js";
import * as superuser from "../superuser.js";
import * as checkIns from "../checkIns.js"
import * as followups from "../followups.js"


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
router.route('/saveRoute').post(routes.saveRoute)
router.route('/addUserRoute').post(userroutes.AddUserRoute)
router.route('/addCheckIn').post(checkIns.AddCheckIn);
router.route('/saveFollowUp').post(followups.saveFollowUp);
router.route('/exportCheckin').post(checkIns.exportCheckin)
router.route('/getCheckinCount').post(checkIns.getCheckinCount)
router.route('/exportAccounts').post(addressinfo.exportAccounts)

/** GET Methods */
router.route('/user/:username').get(controller.getUser)
router.route('/generateOTP').get(controller.verifyUser,localVariables,controller.generateOTP)
router.route('/generateOTPbyEmail').get(localVariables,controller.generateOTPbyEmail)
router.route('/verifyOTP').get(controller.verifyUser,controller.verifyOTP)
router.route('/verifyOTPbyEmail').get(controller.verifyOTPbyEmail)
router.route('/createResetSession').get(controller.createResetSession)
router.route('/get-address-data').get(addressinfo.GetAddressData)
router.route('/get-address-data-locationid/:LocationID').get(addressinfo.GetAddressDataByLocationID)
router.route('/get-address-data-marker').get(addressinfo.GetAddressDataByMarkerId)
router.route('/getRoles').get(roles.getRoles)
router.route('/getRolesByHierarchy').get(roles.getRolesByHierarchy)
router.route('/getRolesByHierarchyandCompany').get(roles.getRolesByHierarchyandCompany)
router.route('/getCompanys').get(companys.getCompanys)
router.route('/getCompanyById').get(companys.getCompanyById)
router.route('/getUsersByLocation').get(userlocations.getUsersByLocation)
router.route('/getLocations').get(locations.getLocations)
router.route('/getLocationsById/:locationId').get(locations.getLocationById)
router.route('/getUserLocations').get(userlocations.GetUserLocations)
router.route('/getUserRoutes').get(userroutes.GetUserRoutes)
router.route('/getRoutes/:locationId').get(routes.getRouteByLocation)
router.route('/getMeetingNotesAndHistory').get(checkIns.getMeetingNotesAndHistory);
router.route('/getFollowUpDataByLocation').get(followups.getFollowUpsByLocation);
router.route('/getFollowUpDataByAddressId').get(followups.getFollowUpsByAddressId);
router.route('/getUserById/:userId').get(users.getUserById);


/** PUT Methods */
router.route('/updateuser').put(Auth,controller.updateUser);
router.route('/resetPassword').put(controller.verifyUser,controller.resetPassword);


/*PATCH Methods */
router.route('/update-address-data/:id').patch(addressinfo.UpdateAddressData)
router.route('/update-follow-up/:id').patch(followups.UpdateFollowUp)
router.route('/updateRoute/:id').patch(routes.updateRoute)
router.route('/updateUserLocationRole/').patch(userlocations.UpdateUserLocationRole)
router.route('/updateUserRoleHierarchy/:id').patch(users.UpdateUserRoleHierarchy)
router.route('/updateUser/:id').patch(users.UpdateUser)

/*DELETE Methods*/
router.route('/deleteRoute/:id').delete(routes.deleteRoute)
router.route('/deleteFollowUp/:addressId').delete(followups.deleteFollowUp)
router.route('/deleteUserLocation').delete(userlocations.DeleteUserLocation)
//

/*Super User*/
router.route('/request-access').post(superuser.SaveRequest)
router.route('/fetch-requests').get(superuser.FetchRequests)
router.route('/update-requests').post(superuser.updateAccessRequest)
router.route('/create-company').post(superuser.createCompany)
router.route('/register-corporate-user').post(superuser.registerCorporateUser)

export default router;

