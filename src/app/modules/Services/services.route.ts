import express from 'express'
import { ServiceController } from './services.controller'

const router = express.Router()

router.post('/create-service', ServiceController.createService)

export const ServiceRoutes = router
