const mongoose = require("mongoose");
const assetSchema = new mongoose.Schema({
    assetTag: {
        type: String,
        required: true,
        unique: true
    },
    name: {
        type: String,
        required: true
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Category",
        required: true
    },
    department: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Department",
        required: true
    },
    serialNumber: {
        type: String
    },
    location: {
        type: String
    },
    condition: {
        type: String,
        enum: [
            "Excellent",
            "Good",
            "Fair",
            "Poor"
        ],
        default: "Good"
    },
    status: {
        type: String,
        enum: [
            "Available",
            "Allocated",
            "Reserved",
            "Under Maintenance",
            "Lost",
            "Retired",
            "Disposed"
        ],
        default: "Available"
    }
}, {
    timestamps: true
});
module.exports = mongoose.model("Asset", assetSchema);