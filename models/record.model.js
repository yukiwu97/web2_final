const mongoose = require('mongoose');

const recordSchema = new mongoose.Schema({
    date: Date,
    amount: Number,
    category: String,
    notes: String,
    year: Number,
    month: Number
});

const Record = mongoose.model("Record", recordSchema);

module.exports = Record;