import { Request, Response } from "express"
import { NotFoundException } from "../exceptions/not-found"
import { ErrorCode } from "../exceptions/root"
import { Address, User } from "@prisma/client"
import { prismaClient } from ".."
import { BadRequestException } from "../exceptions/bad-request"

export const addAddress=async(req:any,res:Response)=>{
  const address=await prismaClient.address.create({
    data:{
        ...req.body,
        userId:req.user.id
    }
  })
  res.json(address)
  }
 
    export const deleteAddress=async(req:Request,res:Response)=>{
       try {
        await prismaClient.address.delete({
            where:{
                id:+req.params.id
            }
        })
       } catch (error) {
        throw new NotFoundException("Address not found",ErrorCode.ADDRESS_NOT_FOUND)
       }
       res.json({
        message:"Address deleted successfully"
       })
    }
    export const listAddress=async(req:any,res:Response)=>{
      const address=await prismaClient.address.findMany({
        where:{
            userId:req.user.id
        }
      })
      res.json(address)
    }
    export const updateUser=async(req:any,res:Response)=>{
        let shippingaddress:Address;
        let billingaddress:Address;
        try {
            shippingaddress=await prismaClient.address.findFirst({
                where:{
                    id:req.body.defaultShippingAddress,
                }
            }) as Address
         if(shippingaddress.userId !==req.user.id){
            throw new BadRequestException("Address does not belong to this user",ErrorCode.ADDRESS_DOES_NOT_BELONG_TO_USER)

         }
           billingaddress=await prismaClient.address.findFirst({
                where:{
                    id:req.body.defaultBillingAddress,
                }
            }) as Address
            if(shippingaddress.userId !==req.user.id){
                throw new BadRequestException("Address does not belong to this user",ErrorCode.ADDRESS_DOES_NOT_BELONG_TO_USER)
    
             }
        } catch (error) {
            throw new NotFoundException("User not found",ErrorCode.USER_NOT_FOUND)
        }
        const updateuser=await prismaClient.user.update({
            where:{
                id:req.user.id
            },
            data:{
                ...req.body,
                defaultShippingAddress:shippingaddress,
                defaultBillingAddress:billingaddress
            }
        })
        res.json(updateuser)
      }
    