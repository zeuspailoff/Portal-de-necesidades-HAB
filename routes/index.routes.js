import express from 'express';
import propousalRoutes from '../routes/proposal.routes.js/proposal.routes.js';
import demandsRouter from '../routes/demads.routes/demands.routes.js';

const router = express.Router();

router.use(propousalRoutes);
router.use(demandsRouter);

export default router;