import express from "express";
import { PORT } from "./secrets";
import rootRouter from "./routes";
import { PrismaClient } from "@prisma/client";
import { errorMiddleware } from "./middlewares/errors";
import { SignUpSchema } from "./schema/users";

const app=express();
app.use(express.json())
app.use("/api",rootRouter)
export const prismaClient=new PrismaClient({
    log:["query","info","warn","error"]
})
app.use(errorMiddleware)
app.listen(PORT, ()=>{
    console.log("server is running on port 3000");
})