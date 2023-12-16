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

router.get('/proposal/bydemand', getProposalByDemandId);
router.post('/proposal/public', upload.array('files', 5), demandExists, isNotOwner, authUser, newProposal);
router.get('/proposal/get', getProposalById);
router.put('/proposal/edit', upload.array('files', 5), authUser, proposalExists, isOwner, editProposalById);
router.put('/proposal/updateStatus', authUser, proposalExists, isOwner, updateProposalStatus);
router.post('/proposal/votes', authUser, proposalExists, isNotOwner, votesProposal);
router.delete('/proposal/delete', authUser, proposalExists, isOwner, deleteProposal);
// router.get('/proposal/votesById/:id', getVotesByProposalId);

export default router;