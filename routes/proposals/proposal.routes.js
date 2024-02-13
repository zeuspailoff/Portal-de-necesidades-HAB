import express from 'express';
import {
    deleteProposal,
    newProposal,
    editProposalById,
    getProposalById,
    proposalExists,
    isOwner,
    authUser,
    updateProposalStatus,
    votesProposal,
    isNotOwner,
    demandExists,
    getPopularProposalsByUserid
} from '../../middlewares/index.middleware.js';
import multer from 'multer';


const storage = multer.memoryStorage();
const upload = multer({ storage: storage });


const router = express.Router();


router.post('/proposals/:demand_id', upload.array('files', 5), demandExists, isNotOwner, authUser, newProposal);
router.get('/proposals/:proposal_id', proposalExists, getProposalById);
router.get('/proposals/user/:user_id', authUser, getPopularProposalsByUserid);
router.put('/proposals/:proposal_id', upload.array('files', 5), authUser, proposalExists, isOwner, editProposalById);
router.put('/proposals/:proposal_id/updateStatus', authUser, proposalExists, isOwner, updateProposalStatus);
router.post('/proposals/:proposal_id/votes', authUser, proposalExists, isNotOwner, votesProposal);
router.delete('/proposals/:proposal_id/demands/:demand_id', authUser, proposalExists,demandExists, isOwner, deleteProposal);

export default router;