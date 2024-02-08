import express from 'express';
import multer from 'multer';

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

import {
  newUser,
  validateUser,
  getAllUsers,
  getUserById,
  deleteUserById,
  updateUser,
  findOrFailUser,
  loginUser,
  authUser,
  userExists,
  passwordUpdate,
  recoveryCodeValidate,
  passwordRecover,
  getAllDemandsByUserId
} from '../../middlewares/index.middleware.js'

const router = express.Router()

router.get('/users', getAllUsers)
router.get('/users/:user_id', authUser, userExists, getUserById)
router.get('/users/:user_id/demands', authUser, getAllDemandsByUserId);
router.get('/users/validate/:registrationCode', validateUser)
router.post('/users/login', loginUser)
router.post('/users', upload.array('files', 2), newUser)
router.post('/users/recover', passwordRecover)
router.put('/users/:user_id/passwordupdate', authUser, findOrFailUser, passwordUpdate)
router.put('/users/:user_id', upload.array('files', 2), authUser, findOrFailUser, updateUser)
router.put('/users/SetPassByrecover/:recoveryCode', recoveryCodeValidate, passwordUpdate)
router.delete('/users/:user_id', authUser, userExists, deleteUserById)

export default router;
