/** source/routes/posts.ts */
import express from 'express';
import controller from '../controllers/posts';
const router = express.Router();

router.get('/posts', controller.getPosts);
router.post('/posts', controller.addPost);


router.get('/posts/:id', controller.getPost);
router.put('/posts/:id', controller.updatePost);
router.delete('/posts/:id', controller.deletePost);


export = router;