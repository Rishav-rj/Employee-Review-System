import bcrypt from "bcrypt";
import UserModel from "../models/userSchema.js"

export const usersignup = async(user)=>{
    try{
        const checkUserExist = await UserModel.find({email:user.email})
        if(checkUserExist.length > 0){
            return
        }  
        const newUser = new UserModel(user)
        newUser.save()
        return newUser
    }catch(err){
        throw new Error("Something went Wrong")
    }
}

export const userlogin = async(email, password)=>{
    try{
        const user = await UserModel.find({email})
        if(user.length > 0){
            const status = await bcrypt.compare(password, user[0].password)
            if (status){
                return user
            } 
        }
    }catch(err){
        throw new Error("Something went Wrong")
    }
}

export const getuserdetail = async(userId)=>{
    try{
        const user = await UserModel.findById(userId)
        return user
    }catch(err){
        throw new Error("Something went Wrong")
    }
}

export const submitFeedback = async(id, userId, content)=>{
    try{
        const user = await UserModel.findById(id)
        if(user){
            const feedbackUser = await UserModel.findById(userId)
            feedbackUser.reviews.push({username:user.fullname, content})
            await feedbackUser.save()
            const index = user.assignedFeedbacks.findIndex(feedback => feedback.userId == userId)
            if (index !== -1){
                user.assignedFeedbacks.splice(index, 1);
                await user.save()
            }
        }
    }catch(err){
        throw new Error("Something went Wrong")
    }
}

export const getAllEmployees = async()=>{
    try{
        const employees = await UserModel.find()
        return employees
    }catch(err){
        throw new Error("Something went Wrong")
    }
}

export const addUser = async(user)=>{
    try{
        const newuser = await UserModel.find({email:user.email})
        if(newuser.length > 0){
            return
        }
        const newUser = new UserModel(user)
        await newUser.save()
        return newUser
    }catch(err){
        throw new Error("Something went Wrong")
    }
}

export const deleteUser = async(id)=>{
    try{
        const user = await UserModel.findByIdAndDelete(id)
        return user
    }catch(err){
        throw new Error("Something went Wrong")
    }
}

export const assignToReview = async(employeeId, employeeToReview)=>{
    try{
        const user = await UserModel.findById(employeeId)
        const employeeReview = await UserModel.findById(employeeToReview)
        const check = await UserModel.findOne({
            _id: employeeId,
            'assignedFeedbacks.userId': { $in: [employeeToReview] }
        });

        if(check){
            return
        }

        user.assignedFeedbacks.push({
            userId:employeeToReview,
            username:employeeReview.fullname
        })
        await user.save()
        return user
    }catch(err){
        throw new Error("Something went Wrong")
    }
}

export const updateUser = async(employeeId, fullname, designation, email, password, isAdmin)=>{
    try{
        const user = await UserModel.findById(employeeId)

        if (user) {
            if (fullname) {
                user.fullname = fullname;
            }
            if (designation) {
                user.designation = designation;
            }
            if (email) {
                user.email = email;
            }
            if (password) {
                user.password = password;
            }
            if (isAdmin !== undefined) {
                user.isAdmin = isAdmin;
            }

            await user.save();
        }
    }catch(err){
        throw new Error("Something went Wrong")
    }
}