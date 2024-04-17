import express from 'express'
import { AvailableDoctorController } from './availableDoctors.controller'

const router = express.Router()

router.post(
  '/create-availableDoctor',
  AvailableDoctorController.createAvailableDoctor,
)

export const AvailableDoctorRoutes = router
