import { NextFunction, Request, Response } from "express";
import { ErrorCode, HttpException } from "../exceptions/root";
import { UnauthorizedException } from "../exceptions/unauthorized";
import * as jwt from "jsonwebtoken"
import { JWT_SECRET } from "../secrets";
import { prismaClient } from "..";

const authMiddleware=async(req:any,res:Response,next:NextFunction)=>{
   const token=req.headers.authorization
   if(!token){
    next(new UnauthorizedException("Unauthorized",ErrorCode.UNAUTHORIZED))
   } else {
    try {
     const payload=jwt.verify(token, JWT_SECRET) as any
     const user=await prismaClient.user.findFirst({
         where:{
             id:payload.userId
         }
     })
     if(!user){
      next(new UnauthorizedException("Unauthorized",ErrorCode.UNAUTHORIZED))
     }
     req.user=user as any
     next()
    } catch (error) {
     next(new UnauthorizedException("Unauthorized",ErrorCode.UNAUTHORIZED))
    }
   }
}
export default authMiddleware