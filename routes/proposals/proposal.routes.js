import express from 'express';
import { 
    deleteProposal,
    newProposal,
    editProposalById,
    getProposalById,
    getProposalByDemandId 
} from '../../middleware/index.middleware.js';
import multer from 'multer';

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });



const router = express.Router();

router.post('/proposal/public', upload.array('files', 5),authUser, newProposal);
router.delete('/proposal/delete',authUser, deleteProposal);
router.put('/proposal/edit', upload.array('files', 5),authUser, editProposalById);
router.get('/proposal/get', getProposalById);
router.get('/proposal/bydemand', getProposalByDemandId);

export default router;