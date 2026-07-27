const express=require("express");
const authRoutes=require("./routes/authRoutes");
require("dotenv").config();
const connectDB=require("./config/db");
const app=express()
connectDB();
app.use(express.json());
app.use("/api/auth",authRoutes);
app.get("/",(req,res)=>{
    res.send("Welcome to assetFlow backend!");
});
const PORT=process.env.PORT || 5000;
app.listen(PORT,()=>{
    console.log(`server running on port ${PORT}`);
});
