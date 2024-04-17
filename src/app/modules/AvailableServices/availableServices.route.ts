import express from 'express'
import { AvailableController } from './availableService.controller'

const router = express.Router()

router.post('/create-service', AvailableController.createAvailableService)

export const AvailableServiceRoutes = router
