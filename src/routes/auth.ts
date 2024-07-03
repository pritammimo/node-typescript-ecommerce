import {Router} from "express";
import {login, signup } from "../controllers/auth";
import { ErrorHandler } from "../error.handler";
const authRoutes:Router=Router()
authRoutes.post("/signup",ErrorHandler(signup))
authRoutes.post("/login",ErrorHandler(login))
export default authRoutes