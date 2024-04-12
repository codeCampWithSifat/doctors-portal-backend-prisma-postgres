import { Specialization } from '@prisma/client'
import prisma from '../../Shared/prisma'

const createSpecialization = async (
  data: Specialization,
): Promise<Specialization> => {
  const result = await prisma.specialization.create({ data })
  return result
}

const getSpecailizations = async (): Promise<Specialization[] | null> => {
  const result = await prisma.specialization.findMany()
  return result
}

const getSpecailization = async (
  id: string | undefined,
): Promise<Specialization | null> => {
  const result = await prisma.specialization.findUnique({
    where: {
      id: id,
    },
  })
  return result
}

const updateSpecialization = async (
  id: string,
  specialization: Specialization,
): Promise<Specialization> => {
  const result = await prisma.specialization.update({
    where: {
      id: id,
    },
    data: specialization,
  })
  return result
}

const deleteSpecialization = async (id: string): Promise<Specialization> => {
  const result = await prisma.specialization.delete({
    where: {
      id: id,
    },
  })
  return result
}

export const SpecializationsService = {
  createSpecialization,
  getSpecailizations,
  getSpecailization,
  updateSpecialization,
  deleteSpecialization,
}
