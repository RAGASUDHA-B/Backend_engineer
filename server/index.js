const express=require("express");
require("dotenv").congig();
const connectDB=require("./config/db");
const app=express()
connectDB();
app.use(express.json());
app.get("/",(req,res)=>{
    res.send("Welcome to assetFlow backend!");
});
const PORT=process.env.PORT || 5000;
app.listen(PORT,()=>{
    console.log(`server running on port ${PORT}`);
});