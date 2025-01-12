import express from 'express';
import { login, signUp } from '../controllers/user_auth.controller';
import auth from '../middlewares/authmiddleware';

const router = express.Router();

//routes
//LOGIN || POST
router.post("/login", login);

//REGISTER || POST
router.post("/register", signUp);

   