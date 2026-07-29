const User=require("../models/User");
const registerUser=async(req,res)=>{
    console.log(req.body);
    res.json({
        message:"Controller working"
    });
};
module.exports={
    registerUser
};