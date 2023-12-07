import express from 'express';
import { insertNewDemand, getAllDemands, getDemandById, deleteDemand, updateDemandStatus, editDemand, insertFile, deleteFile } from "../middleware/index.middleware.js";

const router = express.Router();

router.post('/demands/new', insertNewDemand);
router.get('/demands/getAll', getAllDemands);
router.get('/demands/getDemand', getDemandById);
router.delete('demands/delete', deleteDemand);
router.put('demands/updateStatus', updateDemandStatus);
router.put('demands/edit', editDemand);
// insert file ??
// delete file ??



