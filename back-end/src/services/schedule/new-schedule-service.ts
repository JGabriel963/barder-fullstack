import { prisma } from "../../prisma";

interface NewScheduleRequest {
  customer: string;
  user_id: string;
  haircut_id: string;
}

export const NewScheduleService = {
  async execute({ user_id, haircut_id, customer }: NewScheduleRequest) {
    if (customer === "" || haircut_id === "") {
      throw new Error("Error schedule new service!");
    }

    const schedule = await prisma.service.create({
      data: {
        customer,
        haircut_id,
        user_id,
      },
    });

    return schedule;
  },
};
