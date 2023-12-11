import express from 'express';
import newDemandSchema from '../../schema/demands/newDemand.schema.js';

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

router.post('/demands/new', insertNewDemand);
router.get('/demands/getAll', getAllDemands);
router.get('/demands/getDemand', getDemandById);
router.get('/demands/getAllDemandsByUser', getAllDemandsByUserId);
router.delete('/demands/delete', deleteDemand);
router.put('/demands/updateStatus', updateDemandStatus);
router.put('/demands/edit', editDemand);

export default router;


