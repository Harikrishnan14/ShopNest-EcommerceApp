const express = require('express')
const router = express.Router()
const { authMiddleware, isAdmin } = require('../middlewares/authMiddleware')
const { createCoupon, getAllCoupon, updateCoupon, deleteCoupon, getACoupon } = require('../controllers/couponController')


router.post('/', authMiddleware, isAdmin, createCoupon)
router.get('/', authMiddleware, isAdmin, getAllCoupon)
router.get('/:id', getACoupon)
router.put('/:id', authMiddleware, isAdmin, updateCoupon)
router.delete('/:id', authMiddleware, isAdmin, deleteCoupon)


module.exports = router