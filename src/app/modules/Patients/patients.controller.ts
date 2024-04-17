import { NextFunction, Request, Response } from 'express'
import { PatientsService } from './patients.service'

const createPatient = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { medicalProfile, ...patientData } = req.body
    const result = await PatientsService.createPatient(
      patientData,
      medicalProfile,
    )

    res.status(200).json({
      status: 'Success',
      message: 'Patient And Medical Profile Created Successfully',
      data: result,
    })
  } catch (error) {
    next(error)
  }
}

const getAllPatients = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const result = await PatientsService.getAllPatients()

    res.status(200).json({
      status: 'Success',
      message: 'Patient Retrived Successfully',
      data: result,
    })
  } catch (error) {
    next(error)
  }
}

export const PatientsController = {
  createPatient,
  getAllPatients,
}
