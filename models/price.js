var mongoose = require("mongoose");

var PriceSchema = new mongoose.Schema({
    drewno: Number,
    hebel: Number,
    calowka: Number,
    lata: Number,
    kontrlata: Number,
    opal: Number,
    transport: Number
});

module.exports = mongoose.model("Price", PriceSchema);