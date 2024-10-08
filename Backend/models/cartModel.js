const mongoose = require('mongoose');

var cartSchema = new mongoose.Schema(
    {
        userID: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },
        productID: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Product"
        },
        quantity: {
            type: Number,
            required: true
        },
        price: {
            type: Number,
            required: true
        },
        color: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Color"
        }
    },
    { timestamps: true }
);

module.exports = mongoose.model('Cart', cartSchema);