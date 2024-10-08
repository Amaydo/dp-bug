import { Router } from 'express';
import { checkAuth } from '../middleware/checkAuth.js';
import { createComment } from '../controllers/comments.js';

const router = new Router();

// Create Comment
// http://localhost:5500/api/comments/:id
router.post('/:id', checkAuth, createComment);

export default router;
