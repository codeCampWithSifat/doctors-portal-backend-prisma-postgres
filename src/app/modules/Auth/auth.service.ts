/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */

import { Secret } from 'jsonwebtoken'
import { jwtHelpers } from '../../../helpers/jwtHelpers'
import prisma from '../../Shared/prisma'

const loginUser = async (paylaod: any): Promise<any> => {
  const { email, password }: { email: string; password: string } = paylaod
  let isUserExist
  const admin = await prisma.admin.findUnique({
    where: {
      email,
    },
  })
  const doctor = await prisma.doctor.findUnique({ where: { email } })
  const patient = await prisma.patient.findUnique({ where: { email } })

  if (!admin && !doctor && !patient) {
    throw new Error('User Does Not Exist')
  }

  if (admin || patient || doctor) {
    isUserExist = admin || patient || doctor
  }

  if (isUserExist && isUserExist.password !== password) {
    throw new Error('Password Not Matched')
  }

  // email, role , fullName, password
  const paylaodData = {
    email: isUserExist!.email,
    role: isUserExist!.role,
    fullName: isUserExist!.fullName,
    phoneNumber: isUserExist!.phoneNumber,
  }
  // create token
  const accessToken = jwtHelpers.createToken(
    paylaodData,
    process.env.JWT_SECRET as Secret,
    process.env.EXPIRES_IN as string,
  )

  return {
    accessToken: accessToken,
  }
}

const refreshToken = async (token: string) => {
  if (!token) {
    throw new Error('Token is Required')
  }
  const decodedToken = jwtHelpers.decodedToken(token)
  const { email, role, phoneNumber, fullName } = decodedToken
  if (!email || !role || !phoneNumber || !fullName) {
    throw new Error('Invalid Token')
  }

  // let isUserExist
  const admin = await prisma.admin.findUnique({
    where: {
      email,
    },
  })
  const doctor = await prisma.doctor.findUnique({ where: { email } })
  const patient = await prisma.patient.findUnique({ where: { email } })

  if (!admin && !doctor && !patient) {
    throw new Error('User Does Not Exist')
  }

  const payloadData = {
    email,
    role,
    phoneNumber,
    fullName,
  }
  const newAccessToken = jwtHelpers.createToken(
    payloadData,
    process.env.JWT_SECRET as Secret,
    process.env.EXPIRES_IN as string,
  )

  return {
    accessToken: newAccessToken,
  }
}

export const AuthService = {
  loginUser,
  refreshToken,
}
