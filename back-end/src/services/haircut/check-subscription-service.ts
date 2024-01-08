import { prisma } from "../../prisma";

interface CheckSubscription {
  user_id: string;
}

export const CheckSubscriptionService = {
  async execute({ user_id }: CheckSubscription) {
    const status = await prisma.user.findFirst({
      where: { id: user_id },
      select: {
        subscriptions: {
          select: {
            id: true,
            status: true,
          },
        },
      },
    });

    return status;
  },
};
