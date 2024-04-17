import express from 'express'
import { PatientsController } from './patients.controller'

const router = express.Router()

router.get('/', PatientsController.getAllPatients)
router.post('/create-patient', PatientsController.createPatient)

export const PatientRoutes = router
