import express from 'express';
import propousalRoutes from './proposal/proposal.routes.js';
import demandsRoutes from './demands/demands.routes.js'

const router = express.Router();

router.use(propousalRoutes);
router.use(demandsRoutes);

export default router;