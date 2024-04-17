import { AvailableService } from '@prisma/client'
import prisma from '../../Shared/prisma'

const createAvailableService = async (
  availableService: AvailableService,
): Promise<AvailableService> => {
  const result = await prisma.availableService.create({
    data: availableService,
  })
  return result
}

export const AvailableServices = {
  createAvailableService,
}
