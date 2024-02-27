import bcrypt from "bcrypt";
import UserModel from "../models/userSchema.js"

export const usersignup = async(user)=>{
    try{
        const checkUserExist = await UserModel.find({email:user.email})
        console.log(checkUserExist);
        if(checkUserExist.length > 0){
            return
        }  
        const newUser = new UserModel(user)
        newUser.save()
        return newUser
    }catch(err){
        console.log(err);
        throw new Error("Something went Wrong")
    }
}

export const userlogin = async(email, password)=>{
    try{
        const user = await UserModel.find({email})
        if(user){
            const status = await bcrypt.compare(password, user[0].password)
            if (status){
                return user
            } 
        }
    }catch(err){
        console.log(err);
        throw new Error("Something went Wrong")
    }
}

export const getuserdetail = async(userId)=>{
    try{
        const user = await UserModel.findById(userId)
        return user
    }catch(err){
        console.log(err);
        throw new Error("Something went Wrong")
    }
}

export const submitFeedback = async(id, userId, content)=>{
    try{
        const user = await UserModel.findById(id)
        if(user){
            const feedbackUser = await UserModel.findById(userId)
            feedbackUser.reviews.push({content})
            await feedbackUser.save()
            const index = user.assignedFeedbacks.findIndex(feedback => feedback.userId == userId)
            if (index !== -1){
                user.assignedFeedbacks.splice(index, 1);
                await user.save()
            }
        }
    }catch(err){
        console.log(err);
        throw new Error("Something went Wrong")
    }
}