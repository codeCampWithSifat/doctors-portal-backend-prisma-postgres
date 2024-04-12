/* eslint-disable @typescript-eslint/no-explicit-any */
import express from 'express'
import { SpecializationRouter } from '../modules/Specializations/specializations.route'
import { DoctorsRoutes } from '../modules/Doctors/doctors.route'

const router = express.Router()

const moduleRoutes: any[] = [
  {
    path: '/specializations',
    route: SpecializationRouter,
  },
  {
    path: '/doctors',
    route: DoctorsRoutes,
  },
]

moduleRoutes.forEach(route => router.use(route.path, route.route))
export default router
