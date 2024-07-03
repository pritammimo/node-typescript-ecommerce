import { NextFunction, Request, Response } from "express"
import { ErrorCode, HttpException } from "./exceptions/root"
import { InternalException } from "./exceptions/internal-exception"
import { ZodError } from "zod"
import { BadRequestException } from "./exceptions/bad-request"

export const ErrorHandler = (method:Function) => {
   return async(req:Request,res:Response,next:NextFunction)=>{
       try{
          await method(req,res,next)
       }catch(error:any){
        let exception:HttpException
           if(error instanceof HttpException){
               exception = error
           }else{
            if(error instanceof ZodError){
                exception = new BadRequestException("UnProcessable Entity",ErrorCode.UNPROCESSABLE_ENTITY)
            }
            else {
                exception = new InternalException("Internal Server Error",error,ErrorCode.INTERNAL_EXCEPTION)
            }
               
           }
        next(exception)
       } 

   }
}