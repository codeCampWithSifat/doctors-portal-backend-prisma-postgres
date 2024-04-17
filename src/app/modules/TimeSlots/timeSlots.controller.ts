import { NextFunction, Request, Response } from 'express'
import { TimeSlotsService } from './timeSlots.service'

const createTimeSlots = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { ...timeSlotsData } = req.body
    const result = await TimeSlotsService.createTimeSlots(timeSlotsData)
    res.status(200).json({
      status: 'Success',
      message: 'Time Slots Created Successfully',
      data: result,
    })
  } catch (error) {
    next(error)
  }
}

export const TimeSlotsController = {
  createTimeSlots,
}
