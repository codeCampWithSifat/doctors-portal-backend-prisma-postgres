import { Service } from '@prisma/client'
import prisma from '../../Shared/prisma'

const createService = async (service: Service): Promise<Service> => {
  const result = await prisma.service.create({
    data: service,
  })

  return result
}

export const ServiceService = {
  createService,
}
