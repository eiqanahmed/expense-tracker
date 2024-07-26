const mongoose = require("mongoose");

const TransactionSchema = new mongoose.Schema({
    item: {
        type: String,
        required: true
    },
    value: {
        type: Number,
        required: true
    }, 
    date: {
        type: Date,
        required: true
    }
})

const TransactionModel = mongoose.model("transactions", TransactionSchema);

module.exports = TransactionModel;