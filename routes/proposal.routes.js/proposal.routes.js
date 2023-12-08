import express from 'express';
import { deleteProposal, newProposal, editProposalById, getProposalById, getProposalByDemandId } from '../../middleware/index.middleware.js';



const router = express.Router();

router.post('/propusal/public', newProposal);
router.put('/propusal/delete/:id', deleteProposal);
router.put('/propusal/edit/:id', editProposalById);
router.get('/propusal/get/:id', getProposalById);
router.get('/propusal/bydemand/:demand_id', getProposalByDemandId);

export default router;