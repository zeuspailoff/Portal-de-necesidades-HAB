import express from 'express';
import propousalRoutes from '../routes/proposal.routes.js/proposal.routes.js';
import demandsRoutes from './demandsRoutes.js'

const router = express.Router();

router.use(propousalRoutes);
router.use(demandsRoutes);

export default router;