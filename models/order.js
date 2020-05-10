var mongoose = require("mongoose");

var OrderSchema = new mongoose.Schema({
    name: String,
    address: String,
    description: String,
    value: Number,
    discount: Number,
    deadline: String,
    isDone: {
        type: Boolean,
        default: false
    },
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
    lata: {metryBiezace: Number, price: Number, value: Number, painted: String, description: String},
    kontrlata: {metryBiezace: Number, price: Number, value: Number, painted: String, description: String},
    paczkaOpalu: {amount: Number, price: Number, value: Number, description: String},
    transport:  {transported: Boolean, kilometers: Number, price: Number, value: Number, description: String, deadline: String}

});

module.exports = mongoose.model("Order", OrderSchema);