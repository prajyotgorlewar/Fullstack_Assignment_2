import express from "express";
import authcontrollers from "../controllers/auth-controller.js";
import authMiddleware from "../middlewares/auth-middleware.js"


const router=express.Router();

router.route("/").get(authcontrollers.home);
// router.route("/viewPost").get(authcontrollers.home);


router.route("/register").post(authcontrollers.register);

router.route("/login").post(authcontrollers.login);

router.route('/user').get(authMiddleware, authcontrollers.user)

export default  router;