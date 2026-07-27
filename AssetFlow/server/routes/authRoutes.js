const express=require("express");
const router=express.Router();
const{loginUser,registerUser,getProfile}=require("../controllers/authController");
router.get("/login",loginUser);
router.get("/register",registerUser);
router.get("/profile",getProfile);
modules.exports=router;