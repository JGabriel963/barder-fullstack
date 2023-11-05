import { prismaClient } from "../../database/client";
import { redisClient } from "../../database/redis";

export class UserDetailService {
  async execute(user_id: string) {
    const userRedis = JSON.parse(await redisClient.get(`user-${user_id}`));

    if (userRedis) {
      return {
        redis: userRedis,
      };
    }

    const user = await prismaClient.user.findFirst({
      where: {
        id: user_id,
      },
      select: {
        id: true,
        name: true,
        address: true,
        email: true,
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
  }
}
