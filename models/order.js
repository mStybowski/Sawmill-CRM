var mongoose = require("mongoose");

var OrderSchema = new mongoose.Schema({
    name: String,
    address: String,
    description: String,
    value: Number,
    discount: Number,
    created:
        {
            type: Date,
            default: Date.now
        },
    drewnaKonstrukcyjne: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "DrewnoKonstrukcyjne"
        }
    ],
    calowki: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "DeskaCalowka"
        }
    ],
    customer: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Client"
        }
    ,
    lata: {metryBiezace: Number, price: Number, value: Number},
    kontrlata: {metryBiezace: Number, price: Number, value: Number},
    paczkaOpalu: {amount: Number, price: Number, value: Number},
    transport:  {transported: Boolean, value: Number}

});

module.exports = mongoose.model("Order", OrderSchema);