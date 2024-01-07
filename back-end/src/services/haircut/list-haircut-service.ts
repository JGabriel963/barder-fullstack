import { prisma } from "../../prisma";

interface HaircutRequest {
  user_id: string;
  status: boolean | string;
}

export const ListHaircutService = {
  async execute({ user_id, status }: HaircutRequest) {
    const haircuts = await prisma.haircut.findMany({
      where: { user_id: user_id, status: status === "true" ? true : false },
    });

    return haircuts;
  },
};
