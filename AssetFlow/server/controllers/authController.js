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

const loginUser=async(req,res)=>{
    try{
        const {email,password}=req.body;
        if(!email || !password){
            return res.status(400).json({
                message:"Please provide email and password"
            });

        }
        const user =await User.findOne({email});
        if (!user) {
            return res.status(400).json({
                message: "Invalid Email or Password"
            });
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(400).json({
                message: "Invalid Email or Password"
            });
        }

        res.status(200).json({
            message: "Login Successful"
        });
    }catch(error){
        console.error(error);
        res.status(500).json({
            message:"Internal server error"
        });
    };
};
module.exports = {
    registerUser,loginUser
};