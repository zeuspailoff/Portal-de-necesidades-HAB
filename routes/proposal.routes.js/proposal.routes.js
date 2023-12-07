import express from 'express';
import { newProposal } from '../../middleware/index.middleware.js';


const router = express.Router();

router.post('/propusal/public', newProposal);

export default router;