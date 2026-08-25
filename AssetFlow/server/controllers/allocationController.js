const Allocation = require("../models/Allocation");
const Asset = require("../models/Asset");
const allocateAsset = async (req, res) => {
    try {
        const {
            asset,
            employee,
            expectedReturnDate
        } = req.body;
        if (!asset || !employee) {
            return res.status(400).json({
                message: "Asset and Employee are required"
            });
        }
        const assetData = await Asset.findById(asset);
        if (!assetData) {
            return res.status(404).json({
                message: "Asset not found"
            });
        }
        if (assetData.status !== "Available") {
            return res.status(400).json({
                message: `Asset is currently ${assetData.status}`
            });
        }
        const allocation = await Allocation.create({
            asset,employee,expectedReturnDate
        });
        assetData.status = "Allocated";
        await assetData.save();
        res.status(201).json({
            message: "Asset Allocated Successfully",
            allocation
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Internal Server Error"
        });
    }
};
const getAllocations = async (req, res) => {
    try {
        const allocations = await Allocation.find()
            .populate("asset", "assetTag name")
            .populate("employee", "name email");
        res.status(200).json(allocations);
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Internal Server Error"
        });
    }
};
const returnAsset = async (req, res) => {
    try {
        const allocation = await Allocation.findById(req.params.id);
        if (!allocation) {
            return res.status(404).json({
                message: "Allocation not found"
            });
        }
        allocation.status = "Returned";
        await allocation.save();
        const asset = await Asset.findById(allocation.asset);
        asset.status = "Available";
        await asset.save();
        res.status(200).json({
            message: "Asset Returned Successfully"
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Internal Server Error"
        });
    }
};
module.exports = {
    allocateAsset,getAllocations,returnAsset
};