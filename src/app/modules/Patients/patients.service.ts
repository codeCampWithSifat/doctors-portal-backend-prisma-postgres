/* eslint-disable @typescript-eslint/no-explicit-any */
import { MedicalProfile, Patient } from '@prisma/client'
import prisma from '../../Shared/prisma'

const createPatient = async (
  patient: Patient,
  medicalProfile: MedicalProfile,
): Promise<any> => {
  const result = prisma.$transaction(async transactionClient => {
    const createPatient = await transactionClient.patient.create({
      data: patient,
    })

    const createMedicalProfile = await transactionClient.medicalProfile.create({
      data: {
        ...medicalProfile,
        patientId: createPatient.id,
        profileStatus: 'active',
      },
    })
    return {
      patient: createPatient,
      medicalProfile: createMedicalProfile,
    }
  })

  return result
}

const getAllPatients = async (): Promise<any> => {
  const result = await prisma.patient.findMany()

  return result
}

export const PatientsService = {
  createPatient,
  getAllPatients,
}
