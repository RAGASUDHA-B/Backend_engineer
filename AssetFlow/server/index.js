const dns = require("dns");
dns.setServers(["8.8.8.8", "8.8.4.4"]);
const express=require("express");
require("dotenv").config();
const connectDB=require("./config/db");
connectDB();



//routes
const authRoutes=require("./routes/authRoutes");
const departmentRoutes =require("./routes/departmentRoutes");
const categoryRoutes=require("./routes/categoryRoutes");
const assetRoutes=require("./routes/assetRoutes");
const allocationRoutes=require("./routes/allocationRoutes");
const dashboardRoutes=require("./routes/dashboardRoutes");
const cors = require("cors");
const app=express()
app.use(cors());
app.use(express.json());
//use of routes
app.use("/api/auth",authRoutes);
app.use("/api/departments", departmentRoutes);
app.use("/api/categories", categoryRoutes);
app.use("/api/assets",assetRoutes);
app.use("/api/allocations",allocationRoutes);
app.use("/api/dashboard",dashboardRoutes);
app.get("/",(req,res)=>{
    res.send("Welcome to assetFlow backend");
});
const PORT=process.env.PORT || 5000;
app.listen(PORT,()=>{
    console.log(`server running on port ${PORT}`);
});
