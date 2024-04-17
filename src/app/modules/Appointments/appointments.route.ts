import express from 'express'
import { AppointmentController } from './appointments.controller'

const router = express.Router()

router.get('/', AppointmentController.getAllAppointments)
router.post('/book-appointment', AppointmentController.bookAppointment)
router.patch('/cancel-appointment/:id', AppointmentController.cancelAppointment)
router.patch('/start-appointment/:id', AppointmentController.startedAppointment)
router.patch('/finish-appointment/:id', AppointmentController.finishAppointment)

export const AppointmentRoutes = router
