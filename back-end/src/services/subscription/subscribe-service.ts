import { prisma } from "../../prisma";

interface SubscribeRequest {
  user_id: string;
}

export const SubscribeService = {
  async execute({ user_id }: SubscribeRequest) {
    return user_id;
  },
};
