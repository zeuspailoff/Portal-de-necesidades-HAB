import express from 'express';
import multer from 'multer';

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

import {
    insertNewDemand,
    getAllDemands,
    getDemandById,
    deleteDemand,
    updateDemandStatus,
    editDemand,
    authUser,
    getProposalByDemandId,
    demandExists,
    isOwner
} from "../../middlewares/index.middleware.js";

const router = express.Router();

router.get('/demands', getAllDemands);
router.post('/demands', upload.array('files', 5), authUser, insertNewDemand);
router.get('/demands/:demand_id/proposals', getProposalByDemandId);
router.get('/demands/:demand_id', demandExists, getDemandById);
router.put('/demands/:demand_id', upload.array('files', 5), authUser, demandExists, isOwner, editDemand);
router.put('/demands/:demand_id/updateStatus', authUser, demandExists, isOwner, updateDemandStatus);
router.delete('/demands/:demand_id/', authUser, demandExists, isOwner, deleteDemand);

export default router;