import { Request, Response } from 'express'
import { DoctorService } from './doctors.service'

const createDoctor = async (
  req: Request,
  res: Response,
  //   next: NextFunction,
) => {
  try {
    const { ...doctorData } = req.body
    const doctor = await DoctorService.createDoctor(doctorData)
    res.status(200).json({
      status: 'success',
      message: 'Doctor created successfully',
      data: doctor,
    })
  } catch (error) {
    // next(error)
    res.status(400).json({
      status: 'error',
      message: 'Doctor Created  Failed',
      error,
    })
  }
}

const getDoctors = async (req: Request, res: Response) => {
  try {
    const doctor = await DoctorService.getDoctors()
    res.status(200).json({
      status: 'success',
      message: 'Doctor Retrived successfully',
      data: doctor,
    })
  } catch (error) {
    res.status(400).json({
      status: 'error',
      message: "Didn't Get Any Doctor Data",
      error,
    })
  }
}

const getDoctor = async (req: Request, res: Response) => {
  try {
    const id = req.params.id
    const doctor = await DoctorService.getDoctor(id)
    res.status(200).json({
      status: 'success',
      message: 'A Doctor successfully',
      data: doctor,
    })
  } catch (error) {
    res.status(400).json({
      status: 'error',
      message: "Didn't Get Single Doctor Data",
      error,
    })
  }
}

const updateDoctor = async (
  req: Request,
  res: Response,
  //   next: NextFunction,
) => {
  try {
    const { id } = req.params
    const { ...doctorData } = req.body
    const doctor = await DoctorService.updateDoctor(id, doctorData)
    res.status(200).json({
      status: 'success',
      message: 'Doctor updated successfully',
      data: doctor,
    })
  } catch (error) {
    // next(error)
    res.status(400).json({
      status: 'error',
      message: 'Doctor Update Failed',
      error,
    })
  }
}
const deleteDoctor = async (
  req: Request,
  res: Response,
  //   next: NextFunction,
) => {
  try {
    const { id } = req.params
    const doctor = await DoctorService.deleteDoctor(id)
    res.status(200).json({
      status: 'success',
      message: 'Doctor deleted successfully',
      data: doctor,
    })
  } catch (error) {
    // next(error)
    res.status(400).json({
      status: 'error',
      message: 'Doctor Deleted Failed',
      error,
    })
  }
}

export const DoctorsController = {
  createDoctor,
  updateDoctor,
  deleteDoctor,
  getDoctors,
  getDoctor,
}
