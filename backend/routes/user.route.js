import express from 'express';
import { login, signUp } from '../controllers/user_auth.controller.js';
import auth from '../middlewares/authmiddleware.js';

const router = express.Router();

//routes
//LOGIN || POST
router.post("/login/:passcode", login);

//REGISTER || POST
router.post("/signup/:passcode", signUp);

export default router;     