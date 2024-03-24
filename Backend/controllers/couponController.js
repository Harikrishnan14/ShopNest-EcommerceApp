const Coupon = require('../models/couponModel')
const asyncHandler = require('express-async-handler')
const validateMongoID = require('../utils/validateMongoID')


const createCoupon = asyncHandler(async (req, res) => {
    try {
        const newCoupon = await Coupon.create(req.body)
        res.json(newCoupon)
    } catch (error) {
        throw new Error(error)
    }
})

const getAllCoupon = asyncHandler(async (req, res) => {
    try {
        const coupons = await Coupon.find()
        res.json(coupons)
    } catch (error) {
        throw new Error(error)
    }
})

const updateCoupon = asyncHandler(async (req, res) => {
    const { id } = req.params
    validateMongoID(id)
    try {
        const updatedCoupon = await Coupon.findByIdAndUpdate(id, req.body, { new: true })
        res.json(updatedCoupon)
    } catch (error) {
        throw new Error(error)
    }
})

const deleteCoupon = asyncHandler(async (req, res) => {
    const { id } = req.params
    validateMongoID(id)
    try {
        const deletedCoupon = await Coupon.findByIdAndDelete(id)
        res.json(deletedCoupon)
    } catch (error) {
        throw new Error(error)
    }
})


module.exports = { createCoupon, getAllCoupon, updateCoupon, deleteCoupon }