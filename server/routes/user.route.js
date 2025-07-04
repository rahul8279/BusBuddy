import express from 'express';
import { signUp, login, getUserProfile, logout } from '../controllers/user.controller.js'; 
import isAuthenticated from '../middleware/isAuthentication.js';

const router = express.Router();


router.route('/register').post(signUp);
router.route('/login').post(login);
router.route('/profile').get(isAuthenticated, getUserProfile);
router.route('/logout').post(logout);

export default router;