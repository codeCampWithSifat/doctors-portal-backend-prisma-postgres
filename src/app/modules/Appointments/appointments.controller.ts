import { NextFunction, Request, Response } from 'express'
import { AppointmentService } from './appointments.service'

const bookAppointment = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    //

    const { patientId, availableServiceId, appointmentDate } = req.body

    const result = await AppointmentService.bookAppointment(
      patientId,
      availableServiceId,
      appointmentDate,
    )
    res.status(200).json({
      status: 'Success',
      message: 'Book A Appoinetment Successfully',
      data: result,
    })
  } catch (error) {
    next(error)
  }
}

const getAllAppointments = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const result = await AppointmentService.getAllAppointments()
    res.status(200).json({
      status: 'Success',
      message: 'Get All Appointment Successfully',
      data: result,
    })
  } catch (error) {
    next(error)
  }
}
export const AppointmentController = {
  bookAppointment,
  getAllAppointments,
}
