const express=require("express");
const bcrypt=require("bcrypt")
const { UserModel } = require("../models/user.model");
const jwt = require("jsonwebtoken");

const userRouter=express.Router();


userRouter.post("/signup",async(req,res)=>{
    const {email,password,ConfirmPassword}=req.body;
    try {
        const user=await UserModel.findOne({email});
        if(user){
            res.status(200).send({msg:"Already Registered....!!"})
        }else{
            bcrypt.hash(password,5,async(err,hash)=>{
                const user=await UserModel({email, password:hash})
                await  user.save()
                res.status(200).send({msg:"New User registered.....!!!", user:req.body})
            })
        }
        
    } catch (error) {
        res.status(400).send({error:error.message})
    }
})


userRouter.post("/login",async(req,res)=>{
    const user= {email,password}=req.body;
    try {
        const user=await UserModel.findOne({email})
        if(user){
            bcrypt.compare(password,user.password,(err,result)=>{
                if(result){
                    const token=jwt.sign({userId: user._id},"masai");
                    res.status(200).send({msg:"You are Logged in.....!!!", token})
                }else{
                    res.status(200).send({msg:"Please check your code....????"})
                }
            })
        }
        
    } catch (error) {
        req.status(404).send({error:error.message})
    }
})


module.exports={
    userRouter
}