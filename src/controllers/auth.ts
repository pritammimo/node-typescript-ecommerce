import {Request,Response,NextFunction} from "express";
import { prismaClient } from "..";
import { hashSync,compareSync } from "bcrypt";
import * as jwt from "jsonwebtoken";
import { JWT_SECRET } from "../secrets";
import { BadRequestException } from "../exceptions/bad-request";
import { ErrorCode } from "../exceptions/root";
import { SignUpSchema } from "../schema/users";
import { NotFoundException } from "../exceptions/not-found";

export const signup=async(req:Request,res:Response,next:NextFunction)=>{
    SignUpSchema.parse(req.body)
        const {email,password,name,role}=req.body;
        let user=await prismaClient.user.findFirst({
            where:{
                email
            }
        })
        if(user){
          throw new BadRequestException("User already exists",ErrorCode.USER_ALREADY_EXISTS)
        }
        user=await prismaClient.user.create({
            data:{
                email,
                password:hashSync(password,10),
                name,
                role
            }
        })
        res.json(user)
   
}
export const login=async(req:Request,res:Response)=>{
    const {email,password}=req.body;
    let user=await prismaClient.user.findFirst({
        where:{
            email
        }
    })
    if(!user){
      throw new NotFoundException("User not found", ErrorCode.USER_NOT_FOUND)
    }
    if(!compareSync(password,user.password)){
        throw new BadRequestException("Incorrect password", ErrorCode.INCORRECT_PASSWORD)
    }
    const token=jwt.sign({userId:user.id},JWT_SECRET)
    res.json({user,token})
}
export const me=async(req:any,res:Response)=>{
    res.json(req.user)
}