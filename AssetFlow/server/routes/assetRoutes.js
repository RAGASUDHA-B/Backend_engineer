const express = require("express");
const router = express.Router();
const {
    createAsset,
    getAssets,
    getAssetById,
    updateAsset,
    deleteAsset
} = require("../controllers/assetController");
router.post("/", createAsset);
router.get("/", getAssets);
router.get("/:id", getAssetById);
router.put("/:id", updateAsset);
router.delete("/:id", deleteAsset);
module.exports = router;