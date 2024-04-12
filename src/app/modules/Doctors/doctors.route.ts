import express from 'express'
import { DoctorsController } from './doctors.controller'

const router = express.Router()

router.get('/', DoctorsController.getDoctors)
router.post('/create-doctor', DoctorsController.createDoctor)
router.get('/:id', DoctorsController.getDoctor)
router.patch('/:id', DoctorsController.updateDoctor)
router.delete('/:id', DoctorsController.deleteDoctor)

export const DoctorsRoutes = router
