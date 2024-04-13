/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Doctor } from '@prisma/client'
import prisma from '../../Shared/prisma'

const createDoctor = async (doctor: Doctor): Promise<Doctor> => {
  const result = await prisma.doctor.create({
    data: doctor,
  })
  return result
}

const getDoctors = async (
  limit: number,
  page: number,
  sortBy: string,
  sortOrder: 'asc' | 'desc',
  searchTerm: string,
  filterData: any,
): Promise<Doctor[] | any> => {
  const result = await prisma.doctor.findMany({
    include: {
      specialization: true,
    },
    where: {
      OR: [
        {
          fullName: {
            contains: searchTerm,
            mode: 'insensitive',
          },
        },
        {
          specialization: {
            name: {
              contains: searchTerm,
              mode: 'insensitive',
            },
          },
        },
        {
          qualification: {
            contains: searchTerm,
            mode: 'insensitive',
          },
        },
      ],

      specialization: {
        name: {
          equals: filterData.specialization as string,
          mode: 'insensitive',
        },
      },
      qualification: {
        equals: filterData.qualification as string,
        mode: 'insensitive',
      },
    },
    take: limit,
    skip: (page - 1) * limit,
    orderBy: {
      [sortBy]: sortOrder,
    },
  })
  const total = await prisma.doctor.count()
  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  }
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
