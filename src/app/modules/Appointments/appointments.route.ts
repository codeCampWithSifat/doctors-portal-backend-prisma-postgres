import express from 'express'
import { AppointmentController } from './appointments.controller'

const router = express.Router()

router.post('/book-appointment', AppointmentController.bookAppointment)

export const AppointmentRoutes = router
