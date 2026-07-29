const mongoose=require("mongoose");
const userSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true,
        trim:true
    },
    email:{
        type:String,
        required:true,
        unique:true,
        lowercase:true,
        trim:true
    },
    password:{
        type:String,
        required:true
    },
    role:{
        type:String,
        enum:["Admin","Employee","AssetManager","DepartmentHead"],
        default:"Employee"
    },
    department:{
        type:mongoose.Schema.Types.ObjectId,
        ref: "department"
    },
    phone:{
        type:String
    },
    status:{
        type:String,
        enum:["Active","Inactive"],
        default:"Active"
    }

},{timestamps:true});

module.exports=mongoose.model("user",userSchema);