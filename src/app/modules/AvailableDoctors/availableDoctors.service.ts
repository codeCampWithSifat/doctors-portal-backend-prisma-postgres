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

export const AvailableDoctorService = {
  createAvailableDoctor,
}
