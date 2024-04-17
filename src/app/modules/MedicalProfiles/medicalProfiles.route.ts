import express from 'express'
import { MedicalProfileController } from './medicalProfiles.controller'

const router = express.Router()

router.get('/', MedicalProfileController.getAllMedicalProfiles)
router.get('/:id', MedicalProfileController.getSingleMedicalProfile)

export const MedicalProfileRoutes = router
