const express=require("express");
const { user } = require("../middleware/user.middleware");
const { EmpoloyeeModel } = require("../models/empoloyee.model");
const empoloyeeRouter=express.Router();


empoloyeeRouter.use(user)

empoloyeeRouter.post("/",async(req,res)=>{
    const {firstName,lastName,email,department,salary}=req.body;
    try {
        const empoloyee=new EmpoloyeeModel({firstName,lastName,email,department,salary})
        await empoloyee.save()
        res.status(200).send({msg:"New Empoloyee addedd....",empoloyee:req.body})
    } catch (error) {
        res.status(404).send({error:error.message})
    }
})

empoloyeeRouter.get("/get",user,async(req,res)=>{
    try {
    const {search,department,page,sort}=req.query;
    const limit=5
    const skip=(page-1)*limit
    const totalEmpoloyee=await EmpoloyeeModel.countDocuments()
    const totalPages=Math.ceil(totalEmpoloyee/limit)
    let sortA=1
    if(sort==="asc"){
sortA=1
    }else{
        sortA=-1
    }

    const query={}
        if(search){
            query.firstName=search
        }

        if(department){
            query.department=department
        }

        const empoloyee=await EmpoloyeeModel.find(query).sort({salary:sortA}).skip(skip).limit(limit)
        res.status(200).json({empoloyee,totalPages})
        
    } catch (error) {
        res.status(404).send({error:error.message})
    }
})

empoloyeeRouter.patch("/:id",user,async(req,res)=>{
    const {id}=req.params
    const {firstName,lastName,email,department,salary}=req.body;
    try {
        const empoloyee=await EmpoloyeeModel.findByIdAndUpdate(id,{firstName,lastName,email,department,salary},{new:true})
        res.status(200).json({empoloyee})
    } catch (error) {
        res.status(404).send({error:error.message})
    }

})


empoloyeeRouter.delete("/:id",user,async(req,res)=>{
    const {id}=req.params;
    try {
        const empoloyee=await EmpoloyeeModel.findByIdAndDelete(id)
        res.status(200).json({empoloyee})
    } catch (error) {
        res.status(404).send({error:error.message})
    }

})

module.exports={empoloyeeRouter}


