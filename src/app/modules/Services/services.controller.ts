import { NextFunction, Request, Response } from 'express'
import { ServiceService } from './services.service'

const createService = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    //
    const { ...serviceData } = req.body
    const result = await ServiceService.createService(serviceData)
    res.status(200).json({
      status: 'Success',
      message: 'Create Service Successfully',
      data: result,
    })
  } catch (error) {
    next(error)
  }
}

export const ServiceController = {
  createService,
}
