const express = require('express')
const { registerUser,
    loginUser,
    getAllUsers,
    getUser,
    deleteUser,
    updateUser,
    blockUser,
    unblockUser,
    handleRefreshToken,
    logout
} = require('../controllers/userController')
const { authMiddleware, isAdmin } = require('../middlewares/authMiddleware')
const router = express.Router()


router.post('/register', registerUser)
router.post('/login', loginUser)
router.get('/all-users', getAllUsers)
router.get('/refresh', handleRefreshToken)
router.get("/logout", logout);
router.get('/:id', authMiddleware, isAdmin, getUser)
router.delete('/:id', deleteUser)
router.patch('/update-user', authMiddleware, updateUser)
router.put('/block-user/:id', authMiddleware, isAdmin, blockUser)
router.put('/unblock-user/:id', authMiddleware, isAdmin, unblockUser)


module.exports = router