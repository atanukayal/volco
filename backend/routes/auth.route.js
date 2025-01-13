import express from 'express';
import { checkUsername, login, signUp } from '../controllers/auth.controller.js';
import auth from '../middlewares/authmiddleware.js';

const router = express.Router();

//routes
//LOGIN || POST
router.post("/login/:passcode", login);

//REGISTER || POST
router.post("/signup", signUp);

router.post("/check-username", checkUsername);

export default router;     