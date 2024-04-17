/* eslint-disable @typescript-eslint/no-explicit-any */
import { Service } from '@prisma/client'
import prisma from '../../Shared/prisma'

const createService = async (service: Service): Promise<Service> => {
  const result = await prisma.service.create({
    data: service,
  })

  return result
}

const getAllServices = async (): Promise<any> => {
  const result = await prisma.service.findMany()
  return result
}

export const ServiceService = {
  createService,
  getAllServices,
}
