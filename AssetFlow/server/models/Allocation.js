const mongoose = require("mongoose");
const allocationSchema = new mongoose.Schema({
    asset: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Asset",
        required: true
    },
    employee: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    allocatedDate: {
        type: Date,
        default: Date.now
    },
    expectedReturnDate: {
        type: Date
    },
    status: {
        type: String,
        enum: [
            "Allocated",
            "Returned"
        ],
        default: "Allocated"
    }
},{
    timestamps:true
});
module.exports = mongoose.model("Allocation", allocationSchema);