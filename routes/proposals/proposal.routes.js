import express from 'express';
import {
    deleteProposal,
    newProposal,
    editProposalById,
    getProposalById,
    getProposalByDemandId,
    proposalExists,
    isOwner,
    authUser,
    updateProposalStatus,
    votesProposal,
    isNotOwner,
    demandExists
} from '../../middlewares/index.middleware.js';
import multer from 'multer';


const storage = multer.memoryStorage();
const upload = multer({ storage: storage });



const router = express.Router();

router.get('/proposals/:demand_id/proposals', getProposalByDemandId);
router.post('/demands/:demand_id/proposals', upload.array('files', 5), demandExists, isNotOwner, authUser, newProposal);
router.get('/proposals/:proposal_id', getProposalById);
router.put('/proposals/:proposal_id/edit', upload.array('files', 5), authUser, proposalExists, isOwner, editProposalById);
router.put('/proposals/updateStatus', authUser, proposalExists, isOwner, updateProposalStatus);
router.post('/proposals/:proposal_id/votes', authUser, proposalExists, isNotOwner, votesProposal);
router.delete('/proposals/delete', authUser, proposalExists, isOwner, deleteProposal);

export default router;