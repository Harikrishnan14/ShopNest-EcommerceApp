const { generateToken } = require('../config/JWToken')
const User = require('../models/userModel')
const Product = require('../models/productsModel')
const Cart = require('../models/cartModel')
const Coupon = require('../models/couponModel')
const Order = require('../models/orderModel')
const asyncHandler = require('express-async-handler')
const validateMongoID = require('../utils/validateMongoID')
const { generateRefreshToken } = require('../config/refreshToken')
const jwt = require('jsonwebtoken')
const sendEmail = require('./emailController')
const crypto = require('crypto')
const uniqid = require('uniqid');


const registerUser = asyncHandler(async (req, res) => {
    const email = req.body.email
    const findUser = await User.findOne({ email })
    if (!findUser) {
        const newUser = await User.create(req.body)
        res.json(newUser)
    } else {
        throw new Error("User already exists")
    }
})

const loginUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body
    const findUser = await User.findOne({ email })
    if (findUser && await findUser.isPasswordMatched(password)) {
        const refreshToken = await generateRefreshToken(findUser?.id)
        const updateUser = await User.findByIdAndUpdate(findUser.id, {
            refreshToken: refreshToken
        }, { new: true })
        res.cookie("refreshToken", refreshToken, {
            httpOnly: true,
            maxAge: 72 * 60 * 60 * 1000
        })
        res.json({
            _id: findUser?._id,
            firstname: findUser?.firstname,
            lastname: findUser?.lastname,
            email: findUser?.email,
            mobile: findUser?.mobile,
            token: generateToken(findUser?._id)
        })
    } else {
        throw new Error("Invalid Credentials")
    }
})

const loginAdmin = asyncHandler(async (req, res) => {
    const { email, password } = req.body
    const findAdmin = await User.findOne({ email })
    if (findAdmin.role !== 'admin') {
        throw new Error("Not Authorized")
    }
    if (findAdmin && await findAdmin.isPasswordMatched(password)) {
        const refreshToken = await generateRefreshToken(findAdmin?.id)
        const updateAdmin = await User.findByIdAndUpdate(findAdmin.id, {
            refreshToken: refreshToken
        }, { new: true })
        res.cookie("refreshToken", refreshToken, {
            httpOnly: true,
            maxAge: 72 * 60 * 60 * 1000
        })
        res.json({
            _id: findAdmin?._id,
            firstname: findAdmin?.firstname,
            lastname: findAdmin?.lastname,
            email: findAdmin?.email,
            mobile: findAdmin?.mobile,
            token: generateToken(findAdmin?._id)
        })
    } else {
        throw new Error("Invalid Credentials")
    }
})

const handleRefreshToken = asyncHandler(async (req, res) => {
    const cookie = req.cookies
    if (!cookie?.refreshToken) {
        throw new Error("No Refresh Token in Cookies")
    }
    const refreshToken = cookie.refreshToken
    const user = await User.findOne({ refreshToken })
    if (!user) {
        throw new Error("Refresh Token not Matched/Not present in DB")
    }
    jwt.verify(refreshToken, process.env.JWT_SECRET, (err, decoded) => {
        if (err || user.id !== decoded.id) {
            throw new Error("Something wrong with Refresh Token")
        }
        const accessToken = generateToken(user?._id)
        res.json({ accessToken })
    })
})

const logout = asyncHandler(async (req, res) => {
    const cookie = req.cookies
    if (!cookie?.refreshToken) {
        throw new Error("No Refresh Token in Cookies")
    }
    const refreshToken = cookie.refreshToken
    const user = await User.findOne({ refreshToken })
    if (!user) {
        res.clearCookie("refreshToken", {
            httpOnly: true,
            secure: true,
        });
        return res.sendStatus(204);
    }
    await User.findOneAndUpdate({ refreshToken }, {
        refreshToken: "",
    });
    res.clearCookie("refreshToken", {
        httpOnly: true,
        secure: true,
    });
    res.sendStatus(204);
})

const getAllUsers = asyncHandler(async (req, res) => {
    try {
        const getUsers = await User.find()
        res.json(getUsers)
    } catch (error) {
        throw new Error(error)
    }
})

const getUser = asyncHandler(async (req, res) => {
    const { id } = req.params
    validateMongoID(id)
    try {
        const getUser = await User.findById(id)
        res.json(getUser)
    } catch (error) {
        throw new Error(error)
    }
})

const deleteUser = asyncHandler(async (req, res) => {
    const { id } = req.params
    validateMongoID(id)
    try {
        const deleteUser = await User.findByIdAndDelete(id)
        res.json(deleteUser)
    } catch (error) {
        throw new Error(error)
    }
})

const updateUser = asyncHandler(async (req, res) => {
    const { _id } = req.user
    validateMongoID(_id)
    try {
        const updatedUser = await User.findByIdAndUpdate(_id, {
            firstname: req?.body?.firstname,
            lastname: req?.body?.lastname,
            email: req?.body?.email,
            mobile: req?.body?.mobile
        }, { new: true })
        res.json(updatedUser)
    } catch (error) {
        throw new Error(error)
    }
})

const saveAddress = asyncHandler(async (req, res, next) => {
    const { _id } = req.user
    validateMongoID(_id)
    try {
        const updatedUser = await User.findByIdAndUpdate(_id, {
            address: req?.body?.address
        }, { new: true })
        res.json(updatedUser)
    } catch (error) {
        throw new Error(error)
    }
})

const blockUser = asyncHandler(async (req, res) => {
    const { id } = req.params
    validateMongoID(id)
    try {
        const block = await User.findByIdAndUpdate(id,
            { isBlocked: true },
            { new: true }
        )
        res.json({ message: "User Blocked" })
    } catch (error) {
        throw new Error(error)
    }
})

const unblockUser = asyncHandler(async (req, res) => {
    const { id } = req.params
    validateMongoID(id)
    try {
        const unblock = await User.findByIdAndUpdate(id,
            { isBlocked: false },
            { new: true }
        )
        res.json({ message: "User UnBlocked" })
    } catch (error) {
        throw new Error(error)
    }
})

const updatePassword = asyncHandler(async (req, res) => {
    const { _id } = req.user
    const { password } = req.body
    validateMongoID(_id)
    const user = await User.findById(_id)
    if (password) {
        user.password = password
        const updatedPassword = await user.save()
        res.json(updatedPassword)
    } else {
        res.json(user)
    }
})

const forgotPasswordToken = asyncHandler(async (req, res) => {
    const { email } = req.body
    const user = await User.findOne({ email })
    if (!user) {
        throw new Error("User not found with this email")
    }
    try {
        const token = await user.createPasswordResetToken();
        await user.save();
        const resetURL = `Hi, Please follow this link to reset Your Password. This link is valid till 10 minutes from now. <a href='http://localhost:5000/api/user/reset-password/${token}'>Click Here</a>`;
        const data = {
            to: email,
            text: "Hey User",
            subject: "Forgot Password Link",
            htm: resetURL,
        };
        sendEmail(data);
        res.json(token);
    } catch (error) {
        throw new Error(error);
    }
})

const resetPassword = asyncHandler(async (req, res) => {
    const { password } = req.body
    const { token } = req.params
    const hashedToken = crypto.createHash("sha256").update(token).digest("hex")
    const user = await User.findOne({
        passwordResetToken: hashedToken,
        passwordResetExpires: { $gt: Date.now() }
    })
    if (!user) {
        throw new Error("Token Expired, PLease try again later")
    }
    user.password = password
    user.passwordResetToken = undefined
    user.passwordResetExpires = undefined
    await user.save()
    res.json(user)
})

const getWishlist = asyncHandler(async (req, res) => {
    const { _id } = req.user
    try {
        const user = await User.findById(_id).populate('wishlist')
        res.json(user)
    } catch (error) {
        throw new Error(error)
    }
})

const userCart = asyncHandler(async (req, res) => {
    const { productID, color, quantity, price } = req.body
    const { _id } = req.user
    validateMongoID(_id)
    try {
        let newCart = await new Cart({
            userID: _id,
            productID: productID,
            color: color,
            price: price,
            quantity: quantity
        }).save()
        res.json(newCart)
    } catch (error) {
        throw new Error(error)
    }
})

const getUserCart = asyncHandler(async (req, res) => {
    const { _id } = req.user
    validateMongoID(_id)
    try {
        const cart = await Cart.find({ userID: _id }).populate("productID").populate("color")
        res.json(cart)
    } catch (error) {
        throw new Error(error)
    }
})

const removeProductFromCart = asyncHandler(async (req, res) => {
    const { _id } = req.user
    const { cartItemId } = req.params

    validateMongoID(_id)
    try {
        const deletedProdFromCart = await Cart.deleteOne({ userID: _id, _id: cartItemId })
        res.json(deletedProdFromCart)
    } catch (error) {
        throw new Error(error)
    }
})

const updatedProductQuantityFromCart = asyncHandler(async (req, res) => {
    const { _id } = req.user
    const { cartItemId, newQuantity } = req.params

    validateMongoID(_id)
    try {
        const cartItem = await Cart.findOne({ userID: _id, _id: cartItemId })
        cartItem.quantity = newQuantity
        cartItem.save()
        res.json(cartItem)
    } catch (error) {
        throw new Error(error)
    }
})

const emptyCart = asyncHandler(async (req, res) => {
    const { _id } = req.user
    validateMongoID(_id)
    try {
        const user = await User.findOne(_id)
        const cart = await Cart.findOneAndDelete({ orderBy: user._id })
        res.json(cart)
    } catch (error) {
        throw new Error(error)
    }
})

const applyCoupon = asyncHandler(async (req, res) => {
    const { coupon } = req.body
    const { _id } = req.user
    validateMongoID(_id)
    const validCoupon = await Coupon.findOne({ name: coupon })
    if (validCoupon === null) {
        throw new Error("Invalid Coupon")
    }
    const user = await User.findOne(_id)
    let { cartTotal } = await Cart.findOne({ orderBy: user._id }).populate('products.product')
    let totalAfterDiscount = (cartTotal - (cartTotal * validCoupon.discount) / 100).toFixed(2)
    await Cart.findOneAndUpdate({ orderBy: user._id }, { totalAfterDiscount }, { new: true })
    res.json(totalAfterDiscount)
})

// const createOrder = asyncHandler(async (req, res) => {
//     const { COD, couponApplied } = req.body
//     const { _id } = req.user
//     validateMongoID(_id)
//     try {
//         if (!COD) {
//             throw new Error("Create Cash order failed")
//         }
//         const user = await User.findById(_id)
//         let userCart = await Cart.findOne({ orderBy: user._id })
//         let finalAmount = 0
//         if (couponApplied && userCart.totalAfterDiscount) {
//             finalAmount = userCart.totalAfterDiscount
//         } else {
//             finalAmount = userCart.cartTotal
//         }
//         let newOrder = await new Order({
//             products: userCart.products,
//             paymentIntent: {
//                 id: uniqid(),
//                 method: "COD",
//                 amount: finalAmount,
//                 status: "Cash On Delivery",
//                 created: Date.now(),
//                 currency: "usd"
//             },
//             orderStatus: "Cash On Delivery",
//             orderBy: user._id
//         }).save()
//         let updateQty = userCart.products.map((item) => {
//             return {
//                 updateOne: {
//                     filter: { _id: item.product._id },
//                     update: { $inc: { quanity: -item.count, sold: +item.count } }
//                 }
//             }
//         })
//         const updatedProduct = await Product.bulkWrite(updateQty, {})
//         res.json({ message: "success" })
//     } catch (error) {
//         throw new Error(error)
//     }
// })

const createOrder = asyncHandler(async (req, res) => {
    const { shippingInfo, orderItems, totalPrice, totalPriceAfterDiscount, paymentInfo } = req.body
    const { _id } = req.user

    try {
        const order = await Order.create({
            shippingInfo,
            orderItems,
            totalPrice,
            totalPriceAfterDiscount,
            paymentInfo,
            user: _id
        })
        res.json({ order, success: true })
    } catch (error) {
        throw new Error(error)
    }
})

const getOrders = asyncHandler(async (req, res) => {
    const { _id } = req.user
    validateMongoID(_id)
    try {
        const userOrder = await Order.findOne({ orderBy: _id }).populate('products.product').populate('orderBy').exec()
        res.json(userOrder)
    } catch (error) {
        throw new Error(error)
    }
})

const getAllOrders = asyncHandler(async (req, res) => {
    try {
        const allUserOrders = await Order.find().populate('products.product').populate('orderBy').exec()
        res.json(allUserOrders)
    } catch (error) {
        throw new Error(error)
    }
})

const getOrderByUserId = asyncHandler(async (req, res) => {
    const { id } = req.params
    validateMongoID(id)
    try {
        const userOrder = await Order.findOne({ orderBy: id }).populate('products.product').populate('orderBy').exec()
        res.json(userOrder)
    } catch (error) {
        throw new Error(error)
    }
})

const updateOrderStatus = asyncHandler(async (req, res) => {
    const { status } = req.body
    const { id } = req.params
    validateMongoID(id)
    try {
        const updatedOrderStatus = await Order.findByIdAndUpdate(id, {
            orderStatus: status,
            paymentIntent: {
                status: status
            }
        }, { new: true })
        res.json(updatedOrderStatus)
    } catch (error) {
        throw new Error(error)
    }
})


module.exports = {
    registerUser,
    loginUser,
    loginAdmin,
    getAllUsers,
    getUser,
    deleteUser,
    updateUser,
    blockUser,
    unblockUser,
    handleRefreshToken,
    logout,
    updatePassword,
    forgotPasswordToken,
    resetPassword,
    getWishlist,
    saveAddress,
    userCart,
    getUserCart,
    emptyCart,
    applyCoupon,
    createOrder,
    getOrders,
    getAllOrders,
    getOrderByUserId,
    updateOrderStatus,
    removeProductFromCart,
    updatedProductQuantityFromCart
}