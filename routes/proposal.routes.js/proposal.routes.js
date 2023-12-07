import express from 'express';
import { deleteProposal, newProposal } from '../../middleware/index.middleware.js';



const router = express.Router();

router.post('/propusal/public', newProposal);
router.put('/propusal/delete/:id', deleteProposal);

export default router;