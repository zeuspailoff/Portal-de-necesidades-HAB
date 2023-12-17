import express from 'express';
import propousalRoutes from "./proposals/proposal.routes.js";
import demandsRoutes from './demands/demands.routes.js';
import usersRoutes from './users/users.routes.js';


const router = express.Router();

router.use(propousalRoutes);
router.use(demandsRoutes);
router.use(usersRoutes);


export default router;