import express from 'express';
import { verifyUser } from '../utils/verifyUser.js';
import { create, getposts,deletepost,updatepost,updateecp } from '../controllers/post.controller.js';

const router = express.Router();

router.post('/create', verifyUser, create)
router.get('/getposts', getposts)
router.delete('/deletepost/:postId/:userId',verifyUser, deletepost)
router.put('/updatepost/:postId/:userId',verifyUser, updatepost)
router.put('/updateecp/:postId/',verifyUser, updateecp)

export default router;