import dotenv from "dotenv";
dotenv.config()
import express from "express";
import expressEjsLayouts from "express-ejs-layouts";
import cookieParser from "cookie-parser";
import path from "path"
import userRoute from "./src/routes/userRoute.js";

const app = express()
app.use(cookieParser())

app.use(express.static("public"));
app.use(express.json())
app.use(express.urlencoded({extended:false}));

app.use(expressEjsLayouts)
app.set("view engine", "ejs")
app.set("views", path.resolve("src", "views"))

app.use('/', userRoute)

app.use("*", (req, res)=>{
    res.render("404", {msg:"Wrong URL"})
})

export default app;
