const mongoose = require('mongoose');

var orderSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    shippingInfo: {
        firstName: {
            type: String,
            required: true
        },
        lastName: {
            type: String,
            required: true
        },
        address: {
            type: String,
            required: true
        },
        city: {
            type: String,
            required: true
        },
        state: {
            type: String,
            required: true
        },
        other: {
            type: String,
            required: true
        },
        pincode: {
            type: Number,
            required: true
        },
    },
    paymentInfo: {
        razorPayOrderId: {
            type: String,
            required: true
        },
        razorPayPaymentId: {
            type: String,
            required: true
        },
    },
    orderItems: [
        {
            product: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Product",
                required: true
            },
            color: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Color",
                required: true
            },
            quantity: {
                type: Number,
                required: true
            },
            price: {
                type: Number,
                required: true
            },
        }
    ],
    paidAt: {
        type: Date,
        default: Date.now()
    },
    totalPrice: {
        type: Number,
        required: true
    },
    totalPriceAfterDiscount: {
        type: Number,
        required: true
    },
    orderState: {
        type: String,
        default: "Ordered"
    }
},
    { timestamps: true }
);

module.exports = mongoose.model('Order', orderSchema);