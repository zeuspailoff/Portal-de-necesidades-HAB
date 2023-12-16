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
    demandExists,
    getAvgVotesByProposalId
} from '../../middlewares/index.middleware.js';
import multer from 'multer';


const storage = multer.memoryStorage();
const upload = multer({ storage: storage });



const router = express.Router();

router.get('/proposals/bydemand', getProposalByDemandId);
router.post('/proposals/public', upload.array('files', 5), demandExists, isNotOwner, authUser, newProposal);
router.get('/proposals/get', getProposalById);
router.put('/proposals/edit', upload.array('files', 5), authUser, proposalExists, isOwner, editProposalById);
router.put('/proposals/updateStatus', authUser, proposalExists, isOwner, updateProposalStatus);
router.post('/proposals/votes', authUser, proposalExists, isNotOwner, votesProposal);
router.delete('/proposals/delete', authUser, proposalExists, isOwner, deleteProposal);
router.get('/proposals/AvgVotesById',authUser, proposalExists, getAvgVotesByProposalId);

export default router;