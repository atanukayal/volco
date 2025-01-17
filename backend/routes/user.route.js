import express from "express";
import { fetchUser } from "../controllers/useFetch.controller";
import { auth } from "../middlewares/authmiddleware";

const router = express.Router();

router.get("/fetch-user", auth, fetchUser);

export default router;