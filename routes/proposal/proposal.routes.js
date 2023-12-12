import express from 'express';
import { deleteProposal, newProposal, editProposalById, getProposalById, getProposalByDemandId } from '../../middleware/index.middleware.js';



const router = express.Router();

router.post('/propusal/public', newProposal);
router.delete('/propusal/delete', deleteProposal);
router.put('/propusal/edit', editProposalById);
router.get('/propusal/get', getProposalById);
router.get('/propusal/bydemand', getProposalByDemandId);

export default router;