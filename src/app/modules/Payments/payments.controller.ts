import { NextFunction, Request, Response } from 'express'
import { PaymentService } from './payments.service'

const getAllPayments = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const result = await PaymentService.getAllPayments()
    res.status(200).json({
      status: 'Success',
      message: 'Get All Payment Status',
      data: result,
    })
  } catch (error) {
    next(error)
  }
}

export const PaymentController = {
  getAllPayments,
}
