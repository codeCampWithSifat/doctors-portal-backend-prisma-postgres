/* eslint-disable @typescript-eslint/no-explicit-any */
import { AvailableDoctor } from '@prisma/client'
import prisma from '../../Shared/prisma'

const createAvailableDoctor = async (
  availableDoctor: AvailableDoctor,
): Promise<AvailableDoctor> => {
  const result = await prisma.availableDoctor.create({
    data: availableDoctor,
  })
  return result
}

const getAvailableDoctors = async (): Promise<any> => {
  const result = await prisma.availableDoctor.findMany()
  return result
}

export const AvailableDoctorService = {
  createAvailableDoctor,
  getAvailableDoctors,
}
