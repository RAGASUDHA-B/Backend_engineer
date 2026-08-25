const Asset = require("../models/Asset");
const createAsset = async (req, res) => {
    try {
        const {
            assetTag,name,category,department,serialNumber,location,condition,status
        } = req.body;
        if (!assetTag || !name || !category || !department) {
            return res.status(400).json({
                message: "Please fill all required fields"
            });
        }
        const existingAsset = await Asset.findOne({ assetTag });
        if (existingAsset) {
            return res.status(400).json({
                message: "Asset Tag already exists"
            });
        }
        const asset = await Asset.create({
            assetTag,name,category,department,serialNumber,location,condition,
            status
        });
        res.status(201).json({
            message: "Asset created successfully",
            asset
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Internal Server Error"
        });
    }
};
const getAssets = async (req, res) => {
    try {
        const assets = await Asset.find()
            .populate("category", "name")
            .populate("department", "name");
        res.status(200).json(assets);
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Internal Server Error"
        });
    }
};
const getAssetById = async (req, res) => {
    try {
        const asset = await Asset.findById(req.params.id)
            .populate("category", "name")
            .populate("department", "name");
        if (!asset) {
            return res.status(404).json({
                message: "Asset not found"
            });
        }
        res.status(200).json(asset);
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Internal Server Error"
        });
    }
};
const updateAsset = async (req, res) => {
    try {
        const asset = await Asset.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );
        if (!asset) {
            return res.status(404).json({
                message: "Asset not found"
            });
        }
        res.status(200).json({
            message: "Asset updated successfully",
            asset
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Internal Server Error"
        });
    }
};
const deleteAsset = async (req, res) => {
    try {
        const asset = await Asset.findByIdAndDelete(req.params.id);
        if (!asset) {
            return res.status(404).json({
                message: "Asset not found"
            });
        }
        res.status(200).json({
            message: "Asset deleted successfully"
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Internal Server Error"
        });
    }
};
module.exports = {
    createAsset,getAssets,getAssetById,updateAsset,
    deleteAsset
};