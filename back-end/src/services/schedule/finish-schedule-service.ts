import { prisma } from "../../prisma";

interface FinishSchedule {
  schedule_id: string;
  user_id: string;
}

export const FinishScheduleService = {
  async execute({ schedule_id, user_id }: FinishSchedule) {
    if (schedule_id === "" || user_id === "") {
      throw new Error("Error.");
    }

    try {
      const belongToUser = await prisma.service.findFirst({
        where: { id: schedule_id, user_id: user_id },
      });

      if (!belongToUser) {
        throw new Error("Not authorized");
      }

      await prisma.service.delete({
        where: { id: schedule_id },
      });

      return { message: "Finalizado com sucesso!" };
    } catch (error) {
      throw new Error(error);
    }
  },
};
