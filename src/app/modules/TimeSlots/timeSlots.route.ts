import express from 'express'
import { TimeSlotsController } from './timeSlots.controller'

const router = express.Router()

router.post('/create-slot', TimeSlotsController.createTimeSlots)
router.get('/', TimeSlotsController.getAllTimeSlots)

export const TimeSlotsRoutes = router
