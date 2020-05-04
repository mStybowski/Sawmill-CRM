var mongoose = require("mongoose");

var deskaCalowkaSchema = new mongoose.Schema({
    v: Number,
    x: Number,
    length: Number,
    top: Boolean,
    right: Boolean,
    bot: Boolean,
    left: Boolean,
    amount: Number,
    price: Number,
    value: Number
});

module.exports = mongoose.model("DeskaCalowka", deskaCalowkaSchema);