import jwt from "jsonwebtoken";


const Auth = async(req, res, next)=>{

    const {JWTToken} = req.cookies

    try{
        const payload = jwt.verify(JWTToken, "k8LKe0SGZrSf3138owfM2zPIrrX9")
        req.userId = payload.userId
        next()
    }catch(err){
        res.redirect("/")
    }
}


export default Auth;