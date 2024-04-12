import { Request, Response } from 'express'
import { SpecializationsService } from './specializations.service'

const createSpecialization = async (req: Request, res: Response) => {
  try {
    const { ...data } = req.body
    const result = await SpecializationsService.createSpecialization(data)
    res.status(200).json({
      status: 200,
      message: 'Specialization Created Successfully',
      data: result,
    })
  } catch (error) {
    res.status(400).json({
      status: 'error',
      message: "Did't Get Any Data",
      error,
    })
  }
}

const getSpecailizations = async (req: Request, res: Response) => {
  try {
    const result = await SpecializationsService.getSpecailizations()
    res.status(200).json({
      status: 200,
      message: 'Specialization Retrived  Successfully',
      data: result,
    })
  } catch (error) {
    res.status(400).json({
      status: 'error',
      message: 'Something Went Wrong',
      error,
    })
  }
}

const getSpecailization = async (req: Request, res: Response) => {
  try {
    const id = req.params.id
    const result = await SpecializationsService.getSpecailization(id)
    res.status(200).json({
      status: 200,
      message: 'Get A Single Data Successfully',
      data: result,
    })
  } catch (error) {
    res.status(400).json({
      status: 'error',
      message: "Did't Get Any Single Data",
      error,
    })
  }
}

const updateSpecialization = async (req: Request, res: Response) => {
  try {
    const { id } = req.params
    const { ...specializationData } = req.body
    const specialization = await SpecializationsService.updateSpecialization(
      id,
      specializationData,
    )
    res.status(200).json({
      status: 'Success',
      message: 'Specialization Data Updated Successfully',
      data: specialization,
    })
  } catch (error) {
    res.status(400).json({
      status: 'error',
      message: 'Update A Single Data Successfully',
      error,
    })
  }
}
const deleteSpecialization = async (req: Request, res: Response) => {
  try {
    const { id } = req.params
    const specialization = await SpecializationsService.deleteSpecialization(id)
    res.status(200).json({
      status: 'success',
      message: 'Specialization deleted successfully',
      data: specialization,
    })
  } catch (error) {
    res.status(400).json({
      status: 'error',
      message: 'Deleted  A Single Data Successfully',
      error,
    })
  }
}

export const SpecializationController = {
  createSpecialization,
  getSpecailizations,
  getSpecailization,
  updateSpecialization,
  deleteSpecialization,
}
