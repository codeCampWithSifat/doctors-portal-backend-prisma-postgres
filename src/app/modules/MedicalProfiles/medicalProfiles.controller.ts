import { NextFunction, Request, Response } from 'express'
import { MedicalProfilesService } from './medicalProfiles.service'

const getAllMedicalProfiles = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const result = await MedicalProfilesService.getAllMedicalProfiles()
    res.status(200).json({
      status: 'Success',
      message: 'Medical Profile Retrived Successfully',
      data: result,
    })
  } catch (error) {
    next(error)
  }
}

const getSingleMedicalProfile = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const id = req.params.id
    const result = await MedicalProfilesService.getSingleMedicalProfile(id)
    res.status(200).json({
      status: 'Success',
      message: 'Medical Profile Retrived Successfully',
      data: result,
    })
  } catch (error) {
    next(error)
  }
}

export const MedicalProfileController = {
  getAllMedicalProfiles,
  getSingleMedicalProfile,
}
