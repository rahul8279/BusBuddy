import express from 'express';
import {addRoute, getRoutes,getRouteById, updateRoute, deleteRoute} from '../controllers/route.controller.js'
import  isAuthenticated  from '../middleware/isAuthentication.js'


const router = express.Router();

router.route('/addRoute').post(isAuthenticated, addRoute);
router.route('/getall').get(getRoutes);
router.route('/get/:id').get(getRouteById);
router.route('/update/:id').put(isAuthenticated, updateRoute);
router.route('/delete/:id').post(isAuthenticated, deleteRoute);

export default router;