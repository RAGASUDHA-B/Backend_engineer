const User = require("../models/User");

const registerUser = async (req, res) => {

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
    const user=new User({
        name,email,password
    });
    await user.save();

    
    res.status(201).json({
        message:"User registered successfully",
        user
    });
};

module.exports = {
    registerUser
};