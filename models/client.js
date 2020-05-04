var mongoose = require("mongoose");

var ClientSchema = new mongoose.Schema({
    name: String,
    lastName: String,
    nameFor: String,
    telephone: String,
    address: String,
    description: String,
    kilometers: Number,
    orders: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Order"
        }
    ]
});

module.exports = mongoose.model("Client", ClientSchema);