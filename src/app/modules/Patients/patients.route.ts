import express from 'express'
import { PatientsController } from './patients.controller'

const router = express.Router()

router.post('/create-patient', PatientsController.createPatient)
router.get('/', PatientsController.getAllPatients)

export const PatientRoutes = router
