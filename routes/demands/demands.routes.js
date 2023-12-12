import express from 'express';
import multer from 'multer';

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

import { 
    insertNewDemand,
     getAllDemands,
     getDemandById,
     getAllDemandsByUserId,
     deleteDemand,
     updateDemandStatus,
     editDemand 
} from "../../middleware/index.middleware.js";

const router = express.Router();

router.post('/demands/new', upload.array('files', 5), insertNewDemand);
router.get('/demands/getAll', getAllDemands);
router.get('/demands/getDemand', getDemandById);
router.get('/demands/getAllDemandsByUser', getAllDemandsByUserId);
router.delete('/demands/delete', deleteDemand);
router.put('/demands/updateStatus', updateDemandStatus);
router.put('/demands/edit', upload.array('files', 5), editDemand);

export default router;


