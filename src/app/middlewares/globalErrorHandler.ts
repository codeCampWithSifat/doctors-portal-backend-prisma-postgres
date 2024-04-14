/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Prisma } from '@prisma/client'
import { NextFunction, Request, Response } from 'express'
import httpStatus from 'http-status'
import config from '../../config'

export const globalErrorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  let statusCode = httpStatus.BAD_REQUEST
  let message =
    config.env === 'development' ? err.message : 'Something Went Wrong Global '

  if (config.env === 'development') {
    if (err instanceof Prisma.PrismaClientKnownRequestError) {
      statusCode = 400
      const lines = err.message.trim().split('\n')
      message = lines[lines.length - 1]
      // console.log(message)
    } else if (err instanceof Prisma.PrismaClientValidationError) {
      statusCode = 400
      const lines = err.message.trim().split('\n')
      message = lines[lines.length - 1]
    } else if (err instanceof Error) {
      statusCode = httpStatus.BAD_REQUEST
      message = err.message
    }
  }

  res.status(statusCode).json({
    success: false,
    errorName: err.name,
    message: message,
    // errorStack:
    // config.env === 'development' ? err.stack : 'Something Went Wrong',
  })
}
