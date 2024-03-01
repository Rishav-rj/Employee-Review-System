import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { addUser, assignToReview, deleteUser, getAllEmployees, getuserdetail, submitFeedback, updateUser, userlogin, usersignup } from "../repository/userRepo.js";

export default class UserController {

    // render Signup/Login paage

    getUserForm = async(req, res)=>{
        res.render("home", {"creds":true})
    }

    // render dashboard as per admin or employee access

    getdashboard = async(req, res)=>{
        const userId = req.userId
        const user = await getuserdetail(userId)
        if(user.isAdmin){
            res.render("adminDashboard", {user})
        }else{  
            res.render("userDashboard", {user})   
        }
    }

    // New user creation

    signup = async(req, res)=>{ 
        let {fullname, designation, email, password} = req.body;
        password = await bcrypt.hash(password, 10);
        const user = {fullname, designation, email, password}
        const newUser = await usersignup(user)
        if(newUser){
            res.status(201).send("registered!")
        }else{
            res.status(404).send("email already exist!")
        }
    }

    // Login for existing user

    login = async(req, res)=>{ 
        const {email, password} = req.body;
        
        const user = await userlogin(email, password)
        if(user){
            const jwtToken = jwt.sign({userId:user[0]._id}, process.env.JWT_SECRET, {expiresIn: "1h"})
            res.cookie("JWTToken", jwtToken)
            res.redirect("/dashboard")   
        }else{
            res.render("home", {"creds":false})
        }
    }

    // submiting form content to perticular employee

    submitFeedback = async(req, res)=>{
        const {userId, content} = req.body
        const id = req.userId
        const user = await submitFeedback(id, userId, content)
        res.redirect("/dashboard")
    }

    // rendering all the employees if the user is admin

    getEmployees = async(req, res)=>{
        const userId = req.userId
        const user = await getuserdetail(userId)
        const employees = await getAllEmployees()
        res.render("employees", {user, employees})
    }

    // Adding new Employee by Admin

    addEmployee = async(req, res)=>{
        let {fullname, designation, email, password, isAdmin} = req.body;
        password = await bcrypt.hash(password, 10);
        const user = {fullname, designation, email, password, isAdmin}
        const newUser = await addUser(user)
        if(newUser){
            res.redirect("/employees")
        }else{
            res.render("404", {msg:"Email already Exist!"})
        }
    }

    // Assigning Employee for review from another Employee

    assignEmployee = async(req, res)=>{
        const {employeeId, employeeToReview} = req.body
        const status = await assignToReview(employeeId, employeeToReview)
        res.redirect("/employees")
    }

    // udpate Employee details by Admin

    updateEmployee = async(req, res)=>{
        let {employeeId, fullname, designation, email, password, isAdmin} = req.body
        if(password){
            password = await bcrypt.hash(password, 10);
        }
        const status = await updateUser(employeeId, fullname, designation, email, password, isAdmin)
        res.redirect("/employees")
    }

    // Delete existing Employee by Admin

    deleteEmployee = async(req, res)=>{
        const {id} = req.params
        await deleteUser(id)
        res.redirect("/employees")

    }

    // logout from the dashboard

    logout = async(req, res)=>{
        res.clearCookie("JWTToken")
        res.redirect("/")
    }
}