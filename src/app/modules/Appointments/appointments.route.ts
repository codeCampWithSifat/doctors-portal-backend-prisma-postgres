import express from 'express'
import { AppointmentController } from './appointments.controller'

const router = express.Router()

router.post('/book-appointment', AppointmentController.bookAppointment)
router.get('/', AppointmentController.getAllAppointments)

export const AppointmentRoutes = router
