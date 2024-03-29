const Category = require('../models/productCategoryModel')
const asyncHandler = require('express-async-handler')
const validateMongoID = require('../utils/validateMongoID')


const createCategory = asyncHandler(async (req, res) => {
    try {
        const newCategory = await Category.create(req.body)
        res.json(newCategory)
    } catch (error) {
        throw new Error(error)
    }
})

const updateCategory = asyncHandler(async (req, res) => {
    const { id } = req.params
    validateMongoID(id)
    try {
        const updatedCategory = await Category.findByIdAndUpdate(id, req.body, { new: true })
        res.json(updatedCategory)
    } catch (error) {
        throw new Error(error)
    }
})

const deleteCategory = asyncHandler(async (req, res) => {
    const { id } = req.params
    validateMongoID(id)
    try {
        const deletedCategory = await Category.findByIdAndDelete(id)
        res.json(deletedCategory)
    } catch (error) {
        throw new Error(error)
    }
})

const getACategory = asyncHandler(async (req, res) => {
    const { id } = req.params
    validateMongoID(id)
    try {
        const category = await Category.findById(id)
        res.json(category)
    } catch (error) {
        throw new Error(error)
    }
})

const getAllCategory = asyncHandler(async (req, res) => {
    try {
        const categories = await Category.find()
        res.json(categories)
    } catch (error) {
        throw new Error(error)
    }
})


module.exports = { createCategory, updateCategory, deleteCategory, getACategory, getAllCategory }