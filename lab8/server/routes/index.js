import express from 'express';
import { controllers } from '../controllers';

const router = express.Router();

router.get('/', controllers.all);
router.get('/search', controllers.search);
router.get('/pagination', controllers.pagination);
router.get('/sort', controllers.sort);
router.get('/get/:id', controllers.get);

export default router;
