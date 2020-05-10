var mongoose = require("mongoose");

var deskaCalowkaSchema = new mongoose.Schema({
    v: Number,
    x: Number,
    length: Number,
    htop: String,
    hbottom: String,
    amount: Number,
    price: Number,
    value: Number,
    painted: String,
    heblowane: String
});

module.exports = mongoose.model("DeskaCalowka", deskaCalowkaSchema);