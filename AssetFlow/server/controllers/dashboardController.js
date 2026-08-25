const Department = require("../models/Department");
const Category = require("../models/Category");
const Asset = require("../models/Asset");
const User = require("../models/User");
const Allocation = require("../models/Allocation");
const getDashboard = async (req, res) => {
    try {
        const totalDepartments = await Department.countDocuments();
        const totalCategories = await Category.countDocuments();
        const totalAssets = await Asset.countDocuments();
        const availableAssets = await Asset.countDocuments({
            status: "Available"
        });
        const allocatedAssets = await Asset.countDocuments({
            status: "Allocated"
        });
        const totalEmployees = await User.countDocuments();
        const totalAllocations = await Allocation.countDocuments({
            status: "Allocated"
        });
        res.status(200).json({
            totalDepartments,
            totalCategories,totalAssets,availableAssets,allocatedAssets,totalEmployees, totalAllocations
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Internal Server Error"
        });
    }
};
module.exports = {
    getDashboard
};