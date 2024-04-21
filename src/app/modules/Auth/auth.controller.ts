import { NextFunction, Request, Response } from 'express'
import { AuthService } from './auth.service'

const loginUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { ...loginData } = req.body
    const result = await AuthService.loginUser(loginData)
    res.send({
      statusCode: 200,
      success: true,
      message: 'User Login Successfully',
      data: result,
    })
  } catch (error) {
    next(error)
  }
}

const refreshToken = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const token = req.headers.authorization
    const result = await AuthService.refreshToken(token!)
    res.send({
      statusCode: 200,
      succes: true,
      message: 'Refresh Token Created Successfully',
      data: result,
    })
  } catch (error) {
    next(error)
  }
}

export const AuthController = {
  loginUser,
  refreshToken,
}
