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

const cancelAppointment = async (appointmentId: string) => {
  const appointment = await prisma.appointment.findUnique({
    where: {
      id: appointmentId,
    },
  })

  if (!appointment) {
    throw new Error('Appointment Does Not Exist')
  }
  if (appointment.status === 'cancelled') {
    throw new Error('Appointment has already been cancelled')
  }

  if (appointment.status === 'finished') {
    throw new Error('Appointment has already been Completed')
  }

  const cancelledAppointment = await prisma.$transaction(
    async transactionClient => {
      const appointmentToCancel = await transactionClient.appointment.update({
        where: {
          id: appointmentId,
        },
        data: {
          status: 'cancelled',
        },
      })

      const availableService =
        await transactionClient.availableService.findUnique({
          where: {
            id: appointment.availableServiceId,
          },
        })
      await transactionClient.availableService.update({
        where: {
          id: appointment.availableServiceId,
        },
        data: {
          availableSeats: {
            increment: 1,
          },
          isBooked:
            availableService && availableService?.availableSeats + 1 > 0
              ? false
              : true,
        },
      })

      const payment = await transactionClient.payment.update({
        where: {
          appointmentId,
        },
        data: {
          paymentStatus: 'cancelled',
        },
      })
      return {
        appointment: appointmentToCancel,
        payment,
      }
    },
  )

  return cancelledAppointment
}

const startedAppointment = async (appointmentId: string) => {
  const appointment = await prisma.appointment.findUnique({
    where: {
      id: appointmentId,
    },
  })

  if (!appointment) {
    throw new Error('Appointment Does Not Exist')
  }
  if (appointment.status === 'cancelled') {
    throw new Error('Appointment has already been cancelled')
  }

  if (appointment.status === 'finished') {
    throw new Error('Appointment has already been Completed')
  }

  const startAppointment = await prisma.$transaction(
    async transactionClient => {
      await transactionClient.payment.update({
        where: {
          appointmentId,
        },
        data: {
          paymentStatus: 'paid',
          paymentDate: new Date().toISOString(),
        },
      })

      const appointmentToStart = await transactionClient.appointment.update({
        where: {
          id: appointmentId,
        },
        data: {
          status: 'started',
        },
      })

      if (!appointmentToStart) {
        await transactionClient.payment.update({
          where: {
            appointmentId,
          },
          data: {
            paymentStatus: 'refund',
          },
        })
      }

      return appointmentToStart
    },
  )

  return startAppointment
}

const finishAppointment = async (appointmentId: string): Promise<any> => {
  const appointment = await prisma.appointment.findUnique({
    where: {
      id: appointmentId,
    },
  })

  if (!appointment) {
    throw new Error('Appointment Does Not Exist')
  }
  if (appointment.status === 'cancelled') {
    throw new Error('Appointment has already been cancelled')
  }

  if (appointment.status === 'finished') {
    throw new Error('Appointment has already been Completed')
  }

  const appointmentToFinish = await prisma.appointment.update({
    where: {
      id: appointmentId,
    },
    data: {
      status: 'finished',
    },
  })
  return appointmentToFinish
}

const getAllAppointments = async () => {
  const result = await prisma.appointment.findMany()
  return result
}

export const AppointmentService = {
  bookAppointment,
  getAllAppointments,
  cancelAppointment,
  startedAppointment,
  finishAppointment,
}
