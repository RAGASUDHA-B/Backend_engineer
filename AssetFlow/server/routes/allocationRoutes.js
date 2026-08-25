const express = require("express");
const router = express.Router();
const {
    allocateAsset,getAllocations,returnAsset
} = require("../controllers/allocationController");
router.post("/", allocateAsset);
router.get("/", getAllocations);
router.put("/return/:id", returnAsset);
module.exports = router;