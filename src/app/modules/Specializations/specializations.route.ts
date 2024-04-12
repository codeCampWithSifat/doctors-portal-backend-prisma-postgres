import express from 'express'
import { SpecializationController } from './specializations.controller'

const router = express.Router()

router.get('/', SpecializationController.getSpecailizations)
router.post(
  '/create-specialization',
  SpecializationController.createSpecialization,
)
router.get('/:id', SpecializationController.getSpecailization)
router.patch('/:id', SpecializationController.updateSpecialization)
router.delete('/:id', SpecializationController.deleteSpecialization)

export const SpecializationRouter = router
