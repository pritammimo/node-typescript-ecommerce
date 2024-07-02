import express,{Express,Request,Response} from "express";
import { PORT } from "./secrets";

const app=express();
app.get("/",(req:Request,res:Response)=>{
    res.send("hello world");
})
app.listen(PORT, ()=>{
    console.log("server is running on port 3000");
})