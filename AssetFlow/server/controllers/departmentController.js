const Department=require("../models/Department");
const createDepartment=async(req,res)=>{
    try{
        const{name,description}=req.body;
        if(!name){
            return res.status(400).json({
                message:"Department name is required"
            });
        }
        const existingDepartment=await Department.findOne({name});
        if(existingDepartment) {
            return res.status(400).json({
                message:"Department already exists"
            });
        }
        const department=new Department({
            name,
            description
        });
        await department.save();
        res.status(201).json({
           message:"Department created succsessfully",
           department 
        });
    }
    catch (error){
        console.error(error);
        res.status(500).json({
            message:"internel server error"
        });
    }
};
const getDepartments=async(req,res)=>{
    try{
        const departments=await Department.find();
        res.status(200).json(departments);
    }catch (error){
        console.error(error);
        res.status(500).json({
           message:"Internal Server Error"
        });
    }
};
const getDepartmentById=async(req,res)=>{
    try{
        const department=await Department.findById(req.params.id);
        if(!department){
            return res.status(404).json({
                    message:"Department not found"   
            });
        }
        res.status(200).json(department);
    }
    catch(error){
        console.error(error);
        res.status(500).json({
            message:"Internal server Error"
        });
    }
};
const updateDepartment=async(req,res)=>{
    try{
        const department=await Department.findByIdAndUpdate(
            req.params.id,req.body,{new:true}
        );
        if(!department){
            return res.status(404).json({
                message:"Department not found"
            });
        }
        res.status(200).json({
            message:"Department Updated",
            department
        });
    }
    catch(error){
        console.error(error);
        res.status(500).json({
            message:"Internal server error"
        });
    }
};
const deleteDepartment=async(req,res)=>{
    try{
        const department=await Department.findByIdAndDelete(req.params.id);
        if(!department){
            return res.status(404).json({
                message:"depparment not found"
            });
        }
        res.status(200).json({
            message:"Department deleted"
        })
    }
    catch(error){
        console.error(error);
        res.status(500).json({
            message:"Internal Server Error"
        });
    }
};
module.exports={
    createDepartment,getDepartments,getDepartmentById,updateDepartment,deleteDepartment
};
