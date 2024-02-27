import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { getuserdetail, submitFeedback, userlogin, usersignup } from "../repository/userRepo.js";

export default class UserController {


    getUserForm = async(req, res)=>{
        res.render("home", {"creds":true})
    }

    getdashboard = async(req, res)=>{
        const userId = req.userId
        const user = await getuserdetail(userId)
        res.render("userDashboard", {user}) 
    }


    signup = async(req, res)=>{ 
        let {fullname, email, password} = req.body;
        password = await bcrypt.hash(password, 10);
        const user = {fullname, email, password}
        const newUser = await usersignup(user)
        if(newUser){
            res.status(201).send("registered!")
        }else{
            res.status(404).send("email already exist!")
        }
    }

    login = async(req, res)=>{ 
        const {email, password} = req.body;
        const user = await userlogin(email, password)
        if(user){
            const jwtToken = jwt.sign({userId:user[0]._id}, 'k8LKe0SGZrSf3138owfM2zPIrrX9', {expiresIn: "1h"})
            res.cookie("JWTToken", jwtToken)
            if(user[0].isAdmin){
                res.render("adminDashboard")
            }else{  
                res.redirect("/dashboard")   
            }
        }else{
            res.render("home", {"creds":false})
        }
    }

    submitFeedback = async(req, res)=>{
        const {userId, content} = req.body
        const id = req.userId
        console.log(id);
        const user = await submitFeedback(id, userId, content)
        res.redirect("/dashboard")
    }



    logout = async(req, res)=>{
        res.clearCookie("JWTToken")
        res.redirect("/")
    }
}