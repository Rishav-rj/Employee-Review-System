import dotenv from "dotenv";
dotenv.config()
import express, { urlencoded } from "express";
import cors from "cors"
import expressEjsLayouts from "express-ejs-layouts";
import cookieParser from "cookie-parser";
import path from "path"
import userRoute from "./src/routes/userRoute.js";

const app = express()
app.use(cors())
app.use(cookieParser())

app.use(express.static("public"));
app.use(express.json())
app.use(express.urlencoded({extended:false}));

app.use(expressEjsLayouts)
app.set("view engine", "ejs")
app.set("views", path.resolve("src", "views"))

app.use('/', userRoute)

export default app;
