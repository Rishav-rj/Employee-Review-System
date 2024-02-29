import UserModel from "../src/models/userSchema.js"

const isAdmin = async(req, res, next)=>{

    try{
        const userId = req.userId
        const user = await UserModel.findById(userId)

        if(!user || !user.isAdmin){
            return res.redirect("/")
        }
        next()
    }catch(err){
        res.redirect("/")
    }
}


export default isAdmin;