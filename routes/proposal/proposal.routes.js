import express from 'express';
import {
    deleteProposal,
    newProposal,
    editProposalById,
    getProposalById,
    getProposalByDemandId
} from '../../middlewares/index.middleware.js';
import multer from 'multer';

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });



const router = express.Router();

router.post('/proposal/public', upload.array('files', 5), newProposal);
router.delete('/proposal/delete', deleteProposal);
router.put('/proposal/edit', upload.array('files', 5), editProposalById);
router.get('/proposal/get', getProposalById);
router.get('/proposal/bydemand', getProposalByDemandId);

export default router;