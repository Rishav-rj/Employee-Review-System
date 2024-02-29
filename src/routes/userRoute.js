import express from "express";
import UserController from "../controllers/userController.js";
import Auth from "../../middleware/jwtMiddleware.js";
import isAdmin from "../../middleware/isAdminMiddleware.js";


const userRoute = express.Router()

const userController = new UserController()


userRoute.get("/", userController.getUserForm)
userRoute.get("/dashboard", Auth, userController.getdashboard)
userRoute.get("/logout", userController.logout)
userRoute.get("/employees", Auth, isAdmin, userController.getEmployees)
userRoute.get("/employees/:id/delete", Auth, isAdmin, userController.deleteEmployee)
userRoute.post("/employees/add", Auth, isAdmin, userController.addEmployee)
userRoute.post("/employees/assign", Auth, isAdmin, userController.assignEmployee)
userRoute.post("/employees/update", Auth, isAdmin, userController.updateEmployee)
userRoute.post("/submitfeedback", Auth, userController.submitFeedback)
userRoute.post('/signup', userController.signup)
userRoute.post('/login', userController.login)

export default userRoute;