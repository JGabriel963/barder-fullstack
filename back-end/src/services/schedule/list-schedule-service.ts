import { prisma } from "../../prisma";

export const ListScheduleService = {
  async execute({ user_id }: { user_id: string }) {
    const schedules = await prisma.service.findMany({
      where: { user_id },
      select: {
        id: true,
        customer: true,
        haircuts: true,
      },
    });

    return schedules;
  },
};
