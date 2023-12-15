import express from 'express';

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
  //getUserAccount,
  //editUserPhoto,
  //passwordRecovery,
  //editPassword
} from '../../middlewares/index.middleware.js'

const router = express.Router()

router.post('/users/register', newUser)
router.get('/users/getById/:id',authUser, getUserById)
router.get('/users',authUser, getAllUsers)
router.delete('/users/delete/:id', authUser,userExists, deleteUserById)
router.put('/users/passwordupdate',authUser, findOrFailUser, passwordUpdate)
router.put('/users/update',authUser, findOrFailUser, updateUser)
router.get('/users/validate/:registrationCode', validateUser)
router.post('/users/login', loginUser)
//TODO: Revisar a partir de aca.
router.get('/users', authUser, userExists, getOwnUser)
// router.put('/users/photo', userExists,)
//router.put('/users/photo', authUser, userExists, editUserPhoto)

//router.post('/users/password/recovery', passwordRecovery)
//router.put('/users/password', editPassword)

export default router;
