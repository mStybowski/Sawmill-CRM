var mongoose = require("mongoose");

var drewnoKonstrukcyjneSchema = new mongoose.Schema({
    x: Number,
    y: Number,
    length: Number,
    htop: String,
    hright: String,
    hbottom: String,
    hleft: String,
    amount: Number,
    price: Number,
    value: Number,
    painted: String,
    heblowane: String,
    description: String,
    v:Number
});

module.exports = mongoose.model("DrewnoKonstrukcyjne", drewnoKonstrukcyjneSchema);