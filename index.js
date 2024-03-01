import dotenv from "dotenv";
dotenv.config()
import express from "express";
import expressEjsLayouts from "express-ejs-layouts";
import cookieParser from "cookie-parser";
import path from "path"
import userRoute from "./src/routes/userRoute.js";

const app = express()

// cookie-parser setup
app.use(cookieParser())

// Static file & json formate setup
app.use(express.static("public"));
app.use(express.json())
app.use(express.urlencoded({extended:false}));

// EJS Setup
app.use(expressEjsLayouts)
app.set("view engine", "ejs")
app.set("views", path.resolve("src", "views"))

// default route for user
app.use('/', userRoute)

// Wrong URL route handle
app.use("*", (req, res)=>{
    res.render("404", {msg:"Wrong URL"})
})

export default app;
