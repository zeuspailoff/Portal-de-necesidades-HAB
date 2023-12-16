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
  getOwnUser,
  //passwordRecovery,
} from '../../middlewares/index.middleware.js'

const router = express.Router()

router.post('/users/register', upload.array('files', 1), newUser)
router.get('/users/getById/:id', authUser, getUserById)
router.get('/users', authUser, getAllUsers)
router.delete('/users/delete/:id', authUser, userExists, deleteUserById)
router.put('/users/passwordupdate', authUser, findOrFailUser, passwordUpdate)
router.put('/users/update', upload.array('files', 1), authUser, findOrFailUser, updateUser)
router.get('/users/validate/:registrationCode', validateUser)
router.post('/users/login', loginUser)
//TODO: Revisar a partir de aca.
router.get('/users', authUser, userExists, getOwnUser)
//router.post('/users/password/recovery', passwordRecovery)

export default router;
