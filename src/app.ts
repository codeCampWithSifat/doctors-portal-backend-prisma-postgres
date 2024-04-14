/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import cors from 'cors'
import express, { Application, NextFunction, Request, Response } from 'express'
import httpStatus from 'http-status'

import routes from './app/routes'

import cookieParser from 'cookie-parser'
import { globalErrorHandler } from './app/middlewares/globalErrorHandler'

const app: Application = express()

const corsOptions = {
  origin: true,
  credentials: true,
}
app.use('*', cors(corsOptions))
app.use(cookieParser())

//parser
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use('/api/v1', routes)

app.get('/', async (req: Request, res: Response, next: NextFunction) => {
  res.status(httpStatus.OK).json({
    success: true,
    message: 'Welcome HTTP SERVER',
  })
})

// Global Error Handler
app.use(globalErrorHandler)

app.use((req: Request, res: Response, next: NextFunction) => {
  res.status(httpStatus.NOT_FOUND).json({
    success: false,
    message: 'Not Found',
    errorMessage: {
      message: 'Not Found',
      path: req.originalUrl,
    },
  })
})

export default app

/*
DATABASE_URL="postgres://postgres.fentvcchrvvpxoqoeciy:sifat100doctorsportal@aws-0-ap-southeast-1.pooler.supabase.com:5432/postgres"
*/
