const express=require("express");
const { connection } = require("./db");
const { userRouter } = require("./routes/user.routes");

const app=express();
app.use(express.json())
app.use("/user",userRouter)

app.get("/",(req,res)=>{
    res.send("Welcome to Empoloyee page")
})


app.listen(1234,async()=>{
    try {
        await connection
        console.log("connected to db");
        console.log('server is running on port 1234');
    } catch (error) {
        console.log("Please check it once.....!!");
    }
})