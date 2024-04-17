import express from 'express'
import { TimeSlotsController } from './timeSlots.controller'

const router = express.Router()

router.post('/create-slot', TimeSlotsController.createTimeSlots)

export const TimeSlotsRoutes = router
