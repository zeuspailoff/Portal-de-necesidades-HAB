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

router.post('/propusal/public', upload.array('files', 5), newProposal);
router.delete('/propusal/delete', deleteProposal);
router.put('/propusal/edit', upload.array('files', 5), editProposalById);
router.get('/propusal/get', getProposalById);
router.get('/propusal/bydemand', getProposalByDemandId);

export default router;