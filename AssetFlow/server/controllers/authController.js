const User = require("../models/User");
const bcrypt=require("bcrypt");
const registerUser = async (req, res) => {
try{
    const { name, email, password } = req.body;
    if(!name || !email || !password){
        return res.status(400).json({   //400 bad request,200-success,201-created,401-unauthorized,404-notfound,500 server error
            message:"Please fill all fields"
        });
    }
    const existingUser=await User.findOne({email});  //find the user (findOne()) querying MongoDB  await=>asynchronous database operation
    if(existingUser){
        return res.status(400).json({
            message:"User already exists"
        });
    }
    const hashedPassword=await bcrypt.hash(password,10); //10 is salt round
    const user=new User({
        name,email,password:hashedPassword
    });
    await user.save();

    
    res.status(201).json({
        message:"User registered successfully",
        user
    });
}
catch(error){
    console.error(error);
    res.status(500).json({
        message:"Interner server Error"
    });
}
};
module.exports = {
    registerUser
};