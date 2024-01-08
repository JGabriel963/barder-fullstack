import { prisma } from "../../prisma";

interface CountRequest {
  user_id: string;
}

export const CountHaircutService = {
  async exectue({ user_id }: CountRequest) {
    const count = await prisma.haircut.count({
      where: {
        user_id,
      },
    });

    return count;
  },
};
