const mongoose=require("mongoose");


const empoloyeeSchema=mongoose.Schema({
    firstName:String,
    lastName:String,
    email:String,
    department:String,
    salary:Number
})

const EmpoloyeeModel=mongoose.model("empoloyee", empoloyeeSchema)

module.exports={
    EmpoloyeeModel
}