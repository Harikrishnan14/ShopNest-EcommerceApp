const express = require('express')
const router = express.Router()
const { authMiddleware, isAdmin } = require('../middlewares/authMiddleware')
const { createBlog,
    updateBlog,
    getBlog,
    getAllBlogs,
    deleteBlog,
    likeBlog,
    dislikeBlog,
    uploadImgs
} = require('../controllers/blogController')
const { uploadPhoto,
    blogImgResize
} = require('../middlewares/uploadImagesMiddleware')


router.post('/', authMiddleware, isAdmin, createBlog)
router.put('/upload/:id', authMiddleware, isAdmin, uploadPhoto.array('images', 2), blogImgResize, uploadImgs)
router.put('/like', authMiddleware, likeBlog)
router.put('/dislike', authMiddleware, dislikeBlog)
router.put('/:id', authMiddleware, isAdmin, updateBlog)
router.get('/:id', getBlog)
router.get('/', getAllBlogs)
router.delete('/:id', authMiddleware, isAdmin, deleteBlog)


module.exports = router