const Schema = require("mongoose").Schema;
const mongoose = require("mongoose");

//Model for Report
const ReportDetailsSchema = new Schema({
    reportId: {
        type: Schema.Types.ObjectId,
    },
    cmdtyName: {
        type: String,
        required: true
    },
    cmdtyID: {
        type: String,
        required: true
    },
    marketID: {
        type: String,
        required: true
    },
    marketName: {
        type: String,
        required: true
    },
    users: {
        type: []
    },
    timestamp: {
        type: String,
        required: true
    },
    priceUnit: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    }
})

module.exports = ReportDetails = mongoose.model("ReportDetails", ReportDetailsSchema, "report_details")