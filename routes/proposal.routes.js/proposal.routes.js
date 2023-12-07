import express from 'express';
import { deleteProposal, newProposal, editProposalById } from '../../middleware/index.middleware.js';



const router = express.Router();

router.post('/propusal/public', newProposal);
router.put('/propusal/delete/:id', deleteProposal);
router.put('/propusal/edit/:id', editProposalById);

export default router;