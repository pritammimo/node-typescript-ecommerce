import { NextFunction,Response } from "express";
import { ErrorCode } from "../exceptions/root";
import { UnauthorizedException } from "../exceptions/unauthorized";

const adminMiddleware=async(req:any,res:Response,next:NextFunction)=>{
   const user=req.user
   if(user.role ==="ADMIN"){
    next()
   }
   else {
    next(new UnauthorizedException("Unauthorized",ErrorCode.UNAUTHORIZED))
   }
   }

export default adminMiddleware