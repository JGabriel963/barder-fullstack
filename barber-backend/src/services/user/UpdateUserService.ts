import { prismaClient } from "../../database/client";
import { redisClient } from "../../database/redis";

interface UserRequest {
  user_id: string;
  name: string;
  address: string;
}

export class UpdateUserService {
  async execute({ user_id, name, address }: UserRequest) {
    try {
      const userAlreadyExists = await prismaClient.user.findFirst({
        where: {
          id: user_id,
        },
      });

      if (!userAlreadyExists) {
        throw new Error("User not exists!");
      }

      const userUpdated = await prismaClient.user.update({
        where: {
          id: user_id,
        },
        data: {
          name,
          address,
        },
        select: {
          id: true,
          name: true,
          email: true,
          address: true,
          subscriptions: {
            select: {
              id: true,
              status: true,
            },
          },
        },
      });

      await redisClient.set(
        `user-${user_id}`,
        JSON.stringify({
          id: userUpdated?.id,
          name: userUpdated?.name,
          email: userUpdated?.email,
          address: userUpdated?.address,
          subscriptions: userUpdated?.subscriptions,
        })
      );

      return userUpdated;
    } catch (error) {
      throw new Error("Error an update the user!");
    }
  }
}
