/* eslint-disable @typescript-eslint/no-explicit-any */
import { TimeSlots } from '@prisma/client'
import prisma from '../../Shared/prisma'

const createTimeSlots = async (timeSlots: TimeSlots): Promise<TimeSlots> => {
  const result = await prisma.timeSlots.create({
    data: timeSlots,
  })
  return result
}

const getAllTimeSlots = async (): Promise<any> => {
  const result = await prisma.timeSlots.findMany()
  return result
}

export const TimeSlotsService = {
  createTimeSlots,
  getAllTimeSlots,
}
