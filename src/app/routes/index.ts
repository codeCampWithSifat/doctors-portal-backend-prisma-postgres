/* eslint-disable @typescript-eslint/no-explicit-any */
import express from 'express'
import { SpecializationRouter } from '../modules/Specializations/specializations.route'
import { DoctorsRoutes } from '../modules/Doctors/doctors.route'
import { PatientRoutes } from '../modules/Patients/patients.route'
import { MedicalProfileRoutes } from '../modules/MedicalProfiles/medicalProfiles.route'
import { ServiceRoutes } from '../modules/Services/services.route'
import { AppointmentRoutes } from '../modules/Appointments/appointments.route'
import { AvailableServiceRoutes } from '../modules/AvailableServices/availableServices.route'
import { TimeSlotsRoutes } from '../modules/TimeSlots/timeSlots.route'
import { AvailableDoctorRoutes } from '../modules/AvailableDoctors/availableDoctors.route'
import { PaymentRoutes } from '../modules/Payments/payments.route'

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
  {
    path: '/patients',
    route: PatientRoutes,
  },
  {
    path: '/medicalProfiles',
    route: MedicalProfileRoutes,
  },
  {
    path: '/services',
    route: ServiceRoutes,
  },
  {
    path: '/appointments',
    route: AppointmentRoutes,
  },
  {
    path: '/available-services',
    route: AvailableServiceRoutes,
  },
  {
    path: '/time-slots',
    route: TimeSlotsRoutes,
  },
  {
    path: '/available-doctors',
    route: AvailableDoctorRoutes,
  },
  {
    path: '/payments',
    route: PaymentRoutes,
  },
]

moduleRoutes.forEach(route => router.use(route.path, route.route))
export default router
