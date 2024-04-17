/* eslint-disable @typescript-eslint/no-explicit-any */
import prisma from '../../Shared/prisma'

const bookAppointment = async (
  patientId: string,
  availableServiceId: string,
  appointmentDate: string,
): Promise<any> => {
  // checking if the available service exist
  const availableService = await prisma.availableService.findUnique({
    where: {
      id: availableServiceId,
    },
  })

  if (!availableService) {
    throw new Error('This Service is not available')
  }

  if (availableService.availableSeats === 0) {
    throw new Error('This Service is Fully Booked')
  }

  const booking = await prisma.$transaction(async transactionClient => {
    const appointment = await transactionClient.appointment.create({
      data: {
        appointmentDate,
        patientId,
        availableServiceId,
        status: 'pending',
      },
    })

    //
    await transactionClient.availableService.update({
      where: {
        id: availableServiceId,
      },
      data: {
        availableSeats: availableService.availableSeats - 1,
        isBooked: availableService.availableSeats - 1 === 0 ? true : false,
      },
    })

    const payment = await transactionClient.payment.create({
      data: {
        amount: availableService.fees,
        paymentStatus: 'pending',
        appointmentId: appointment.id,
      },
    })

    return {
      appointment,
      payment,
    }
  })

  return booking
}

const getAllAppointments = async () => {
  const result = await prisma.appointment.findMany()
  return result
}

export const AppointmentService = {
  bookAppointment,
  getAllAppointments,
}
