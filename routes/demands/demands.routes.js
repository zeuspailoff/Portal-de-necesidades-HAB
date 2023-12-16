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
    editDemand,
    authUser,
    demandExists,
    isOwner,
    isNotOwner
} from "../../middlewares/index.middleware.js";

const router = express.Router();

router.get('/demands/getAll', getAllDemands);
router.post('/demands/new', upload.array('files', 5), isNotOwner, authUser, insertNewDemand);
router.get('/demands/getDemand', getDemandById);
router.get('/demands/getAllDemandsByUser', authUser, getAllDemandsByUserId);
router.put('/demands/edit', upload.array('files', 5), authUser, demandExists, isOwner, editDemand);
router.put('/demands/updateStatus', authUser, demandExists, isOwner, updateDemandStatus);
router.delete('/demands/delete', authUser, demandExists, isOwner, deleteDemand);

export default router;


