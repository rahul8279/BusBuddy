import express from 'express';
import {addBus,getBuses,getBusById,updateBusLocation,assignDriverToBus,deactivateBus} from '../controllers/bus.controller.js';
import isAuthenticated  from '../middleware/isAuthentication.js';


const router = express.Router();

router.route('/addBus').post(isAuthenticated, addBus);
router.route('/getallbus').get(getBuses)
router.route('/getbus/:id').get(getBusById);
router.route('/updatebuslocation').put(isAuthenticated,updateBusLocation);
router.route('/assigndriver').put(isAuthenticated,assignDriverToBus);
router.route('/deactivatebus/:id').put(isAuthenticated,deactivateBus);

export default router;  