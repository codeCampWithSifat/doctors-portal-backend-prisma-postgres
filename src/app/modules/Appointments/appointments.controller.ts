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

const cancelAppointment = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    //
    const { id } = req.params
    const result = await AppointmentService.cancelAppointment(id)
    res.status(200).json({
      status: 'Success',
      message: 'Cancelled Your Appointment',
      data: result,
    })
  } catch (error) {
    next(error)
  }
}

const startedAppointment = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const id = req.params.id
    const result = await AppointmentService.startedAppointment(id)
    res.status(200).json({
      status: 'Success',
      message: 'Appointment Started Successfully',
      data: result,
    })
  } catch (error) {
    next(error)
  }
}

const finishAppointment = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const id = req.params.id
    const result = await AppointmentService.finishAppointment(id)
    res.status(200).json({
      status: 'Success',
      message: 'Appointment Finished Successfully Congratulation',
      data: result,
    })
  } catch (error) {
    next(error)
  }
}
export const AppointmentController = {
  bookAppointment,
  getAllAppointments,
  cancelAppointment,
  startedAppointment,
  finishAppointment,
}
