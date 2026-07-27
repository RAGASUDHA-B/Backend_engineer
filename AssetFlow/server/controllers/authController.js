const loginUser=(req,res)=>{
    res.send("Login successfull");
};
const registerUser=(req,res)=>{
    res.send("Register Successfull");
};

const getProfile=(req,res)=>{
    res.send("User profile");
};

module.exports={
    loginUser,registerUser,getProfile
};