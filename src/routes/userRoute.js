import express from "express";
import UserController from "../controllers/userController.js";
import Auth from "../../middleware/jwtMiddleware.js";


const userRoute = express.Router()

const userController = new UserController()


userRoute.get("/", userController.getUserForm)
userRoute.get("/dashboard", Auth, userController.getdashboard)
userRoute.get("/logout", userController.logout)
userRoute.post("/submitfeedback", Auth, userController.submitFeedback)
userRoute.post('/signup', userController.signup)
userRoute.post('/login', userController.login)

export default userRoute;