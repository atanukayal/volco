import JWT from "jsonwebtoken";
import { admin } from "../config/firebase.js";

export
 const auth = async (req, res, next) => {
  try {
    const firebasetoken = req.headers.authorization?.spilt(" ")[1];

    if (!firebasetoken) {
      return res.status(401).send({
        message: "No token provided.",
        success: false,
      });
    }
    const decoded = await admin.auth().verifyIdToken(firebasetoken);

    if (!decoded) {
      return res.status(401).send({
        message: "Invalid Token",
        success: false,
      });
    }

    req.user = decoded;
    next();
  } catch (error) {
    console.error("Error in auth middleware:", error);
    res.status(401).send({
      message: "Auth Failed",
      success: false,
    });
  }
};


