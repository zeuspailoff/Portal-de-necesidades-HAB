import express from 'express';
import { insertNewDemand } from "../../middleware/index.middleware.js";

const router = express.Router();

router.post('/demand/public', insertNewDemand);


export default router;