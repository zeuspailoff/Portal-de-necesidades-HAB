import express from 'express';
import propousalRoutes from '../routes/proposal.routes.js/proposal.routes.js';

const router = express.Router();

router.use(propousalRoutes);

export default router;