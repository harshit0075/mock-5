const jwt=require("jsonwebtoken")

const user=(req,res,next)=>{
    const token=req.headers.authorization.split(" ")||[];
    if(token){
        try {
            const decoded=jwt.verify(token, "masai");
        if(decoded){
            req.body.userId=decoded.userId;
            next();
        }else{
            res.json({msg:"Check your token...!!"})
        }
        } catch (error) {
            res.json({msg:"Welcome.....!!!!!"})
        }
        
    }else{
        res.json({msg:"Please Login Again......?????"})
    }
}

module.exports={
    user
}