import { MedicalProfile } from '@prisma/client'
import prisma from '../../Shared/prisma'

const getAllMedicalProfiles = async () => {
  const result = await prisma.medicalProfile.findMany({
    include: {
      patient: true,
    },
  })
  return result
}

const getSingleMedicalProfile = async (
  id: string,
): Promise<MedicalProfile | null> => {
  const result = await prisma.medicalProfile.findUnique({
    where: {
      id,
    },
    include: {
      patient: true,
    },
  })
  // console.log(result)
  return result
}

export const MedicalProfilesService = {
  getAllMedicalProfiles,
  getSingleMedicalProfile,
}
