import { Doctor } from '@prisma/client'
import prisma from '../../Shared/prisma'

const createDoctor = async (doctor: Doctor): Promise<Doctor> => {
  const result = await prisma.doctor.create({
    data: doctor,
  })
  return result
}

const getDoctors = async (): Promise<Doctor[]> => {
  const result = await prisma.doctor.findMany({
    include: {
      specialization: true,
    },
  })
  return result
}

const getDoctor = async (id: string): Promise<Doctor | null> => {
  const result = await prisma.doctor.findUnique({
    where: {
      id: id,
    },
    include: {
      specialization: true,
    },
  })
  return result
}

const updateDoctor = async (id: string, doctor: Doctor): Promise<Doctor> => {
  const result = await prisma.doctor.update({
    where: {
      id: id,
    },
    data: doctor,
  })
  return result
}

const deleteDoctor = async (id: string): Promise<Doctor> => {
  const result = await prisma.doctor.delete({
    where: {
      id: id,
    },
  })
  return result
}

export const DoctorService = {
  createDoctor,
  getDoctors,
  getDoctor,
  updateDoctor,
  deleteDoctor,
}
