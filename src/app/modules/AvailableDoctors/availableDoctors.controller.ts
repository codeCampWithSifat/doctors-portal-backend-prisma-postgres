import { NextFunction, Request, Response } from 'express'
import { AvailableDoctorService } from './availableDoctors.service'

const createAvailableDoctor = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { ...availableDoctorData } = req.body
    const result = await AvailableDoctorService.createAvailableDoctor(
      availableDoctorData,
    )

    res.status(200).json({
      status: 'Success',
      message: 'Create Available Doctor Succesfully',
      data: result,
    })
  } catch (error) {
    next(error)
  }
}

const getAvailableDoctors = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const result = await AvailableDoctorService.getAvailableDoctors()
    res.status(200).json({
      status: 'Success',
      message: 'Get All Available Doctors',
      data: result,
    })
  } catch (error) {
    next(error)
  }
}

export const AvailableDoctorController = {
  createAvailableDoctor,
  getAvailableDoctors,
}
