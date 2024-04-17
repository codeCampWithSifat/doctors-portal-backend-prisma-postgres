import express from 'express'
import { PaymentController } from './payments.controller'

const router = express.Router()

router.get('/', PaymentController.getAllPayments)

export const PaymentRoutes = router
