import express from 'express';
import { login,logout } from '../controllers/user_auth.controller';
import auth from '../middlewares/authmiddleware';

const router = express.Router();

//routes
//LOGIN || POST
router.post("/login", loginController);

//REGISTER || POST
router.post("/register", registerController);

   