import jwt from "jsonwebtoken";


const Auth = async(req, res, next)=>{

    const {JWTToken} = req.cookies

    try{
        const payload = jwt.verify(JWTToken, process.env.JWT_SECRET)
        req.userId = payload.userId
        next()
    }catch(err){
        res.redirect("/")
    }
}


export default Auth;