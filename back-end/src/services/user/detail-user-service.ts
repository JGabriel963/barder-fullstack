import { prisma } from "../../prisma";

export const UserDetailService = {
  async execute(user_id: string) {
    const user = await prisma.user.findFirst({
      where: { id: user_id },
      select: {
        id: true,
        name: true,
        email: true,
        address: true,
        subscriptions: {
          select: {
            id: true,
            priceId: true,
            status: true,
          },
        },
      },
    });

    return user;
  },
};
