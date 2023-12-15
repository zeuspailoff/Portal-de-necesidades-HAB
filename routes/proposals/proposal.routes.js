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
    updateProposalStatus 
} from '../../middlewares/index.middleware.js';
import multer from 'multer';

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });



const router = express.Router();

router.post('/proposal/public', upload.array('files', 5), authUser, newProposal);
router.delete('/proposal/delete', authUser, proposalExists, isOwner, deleteProposal);
router.put('/proposal/edit', upload.array('files', 5), authUser, proposalExists, isOwner, editProposalById);
router.get('/proposal/get', getProposalById);
router.get('/proposal/bydemand', getProposalByDemandId);
router.put('/proposal/updateStatus', authUser, proposalExists, /*aca falta agregar que NO sea el duenio?*/ updateProposalStatus);

export default router;