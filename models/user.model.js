const mongoose=require("mongoose");

const userSchema=mongoose.Schema({
    email:String,
    password:String,
    ConfirmPassword:String
},{
    versionKey:false
})

const UserModel=mongoose.model("user", userSchema)

module.exports={
    UserModel
}