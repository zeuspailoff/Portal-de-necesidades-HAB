import express from 'express';


import {
  newUser,
  validateUser,
  getAllUsers,
  getUserById,
  deleteUserById,
  updateUser,
  findOrFailUser,
  // loginUser,
  //authUser,
  userExists,
  passwordUpdate,
  //getOwnUser,
  //getUserAccount,
  //editUserPhoto,
  //passwordRecovery,
  //editPassword
} from '../../middleware/index.middleware.js'

const router = express.Router()

router.post('/users/register', newUser)
router.get('/users/getById/:id',getUserById)
router.get('/users',getAllUsers)
router.delete('/users/delete/:id',userExists,deleteUserById)
router.put('/users/passwordupdate',passwordUpdate )
router.put('/users/update', findOrFailUser ,updateUser);
// router.get('/users/validate/:registrationCode', validateUser)
//router.post('/users/login', loginUser)
//router.get('/users', authUser, userExists, getOwnUser)
// router.put('/users/photo', userExists,)
//router.put('/users/photo', authUser, userExists, editUserPhoto)

//router.post('/users/password/recovery', passwordRecovery)
//router.put('/users/password', editPassword)

export default router;
