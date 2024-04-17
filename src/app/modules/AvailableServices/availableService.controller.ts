import { NextFunction, Request, Response } from 'express'
import { AvailableServices } from './availableService.service'

const createAvailableService = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const result = await AvailableServices.createAvailableService(req.body)
    res.status(200).json({
      status: 'Success',
      message: 'Available Service Created Successfully',
      data: result,
    })
  } catch (error) {
    next(error)
  }
}

const getAvailableService = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const result = await AvailableServices.getAvailableService()
    res.status(200).json({
      status: 'Success',
      message: 'Available Service Retrived  Successfully',
      data: result,
    })
  } catch (error) {
    next(error)
  }
}

export const AvailableController = {
  createAvailableService,
  getAvailableService,
}
