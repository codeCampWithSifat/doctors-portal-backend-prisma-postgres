import prisma from '../../Shared/prisma'

const getAllPayments = async () => {
  const result = await prisma.payment.findMany()
  return result
}

export const PaymentService = {
  getAllPayments,
}
