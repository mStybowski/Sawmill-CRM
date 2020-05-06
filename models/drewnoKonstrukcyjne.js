var mongoose = require("mongoose");

var drewnoKonstrukcyjneSchema = new mongoose.Schema({
    x: Number,
    y: Number,
    length: Number,
    hebel: [String],
    amount: Number,
    price: Number,
    value: Number,
    v:Number
});

module.exports = mongoose.model("DrewnoKonstrukcyjne", drewnoKonstrukcyjneSchema);