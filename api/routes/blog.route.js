import express from 'express';
import { createBlog } from '../controllers/blog.controller.js';
// import { verifyToken } from '../utils/verifyUser.js';
import { get } from 'mongoose';

const router = express.Router();

router.post('/create', createBlog)
// router.delete('/delete/:id', verifyToken, deleteListing)
// router.post('/update/:id', verifyToken, updateListing)
// router.get('/get/:id', getListing)
// router.get('/get', getListings)

export default router