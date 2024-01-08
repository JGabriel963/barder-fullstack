import { prisma } from "../../prisma";

export const DetailHaircutService = {
  async execute({ haircut_id }: { haircut_id: string }) {
    const haricut = await prisma.haircut.findFirst({
      where: {
        id: haircut_id,
      },
    });

    return haricut;
  },
};
