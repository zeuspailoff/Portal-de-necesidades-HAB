import express from 'express'
import {
  newUser,
  validateUser,
  loginUser,
  authUser,
  userExists,
  getOwnUser,
  getUserProfile,
  editUserPhoto,
  passwordRecover,
  editUserPassword
} from '../middlewares/index.middleware.js'

const router = express.Router()

router.post('/users/register', newUser)
router.get('/users/validate/:registrationCode', validateUser)
router.post('/users/login', loginUser)
router.get('/users', authUser, userExists, getOwnUser)
router.get('/users/:userId', userExists, getUserProfile)
router.put('/users/photo', authUser, userExists, editUserPhoto)
router.post('/users/password/recover', passwordRecover)
router.put('/users/password', editUserPassword)

export default router
