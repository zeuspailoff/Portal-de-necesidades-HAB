import express from 'express'
import {
  newUser,
  validateUser,
  loginUser,
  //authUser,
  userExists,
  //getOwnUser,
  getUserAccount,
  //editUserPhoto,
  passwordRecovery,
  editPassword
} from '../middleware/index.middleware.js'

const router = express.Router()

router.post('/users/register', newUser)
router.get('/users/validate/:registrationCode', validateUser)
router.post('/users/login', loginUser)
router.get('/users', /*authUser,*/ userExists, getOwnUser)
router.get('/users/:userId', userExists, getUserAccount)
router.put('/users/photo', /*authUser,*/ userExists, /*editUserPhoto*/)
router.post('/users/password/recover', passwordRecovery)
router.put('/users/password', editPassword)

export default router
