import {Router} from "express";
import { ErrorHandler } from "../error.handler";

import authMiddleware from "../middlewares/auth";
import adminMiddleware from "../middlewares/admin";
import { addAddress, deleteAddress, listAddress } from "../controllers/users";

const userRoutes:Router=Router()
userRoutes.post("/address", [authMiddleware], ErrorHandler(addAddress))
userRoutes.delete("/address/:id", [authMiddleware], ErrorHandler(deleteAddress))
userRoutes.get("/address", [authMiddleware], ErrorHandler(listAddress))
export default userRoutes