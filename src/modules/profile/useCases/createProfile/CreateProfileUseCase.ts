import { CreateProfileDTO } from "@modules/profile/dtos/CreateProfileDTO";

import { prisma } from "@prismasrc/client";

export class CreateProfileUseCase {
  async execute({ phone, connectId }: CreateProfileDTO) {
    const profile = await prisma.profile.create({
      data: {
        userId: connectId,
        phone,
      },
    });

    return profile;
  }
}
