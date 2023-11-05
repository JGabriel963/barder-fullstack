import { compare } from "bcryptjs";
import { prismaClient } from "../../database/client";
import { sign } from "jsonwebtoken";
import { redisClient } from "../../database/redis";

export interface AuthUserRequest {
  email: string;
  password: string;
}

export class AuthUserService {
  async execute({ email, password }: AuthUserRequest) {
    const user = await prismaClient.user.findFirst({
      where: { email },
      include: {
        subscriptions: true,
      },
    });

    if (!user) {
      throw new Error("Email/password incorrect");
    }

    const passwordMatch = await compare(password, user?.password);

    if (!passwordMatch) {
      throw new Error("Email/password incorrect");
    }

    const token = sign(
      {
        name: user.name,
        email: user.email,
      },
      process.env.JWT_SECRET,
      {
        subject: user.id,
        expiresIn: "7d",
      }
    );

    const own = {
      id: user?.id,
      name: user?.name,
      email: user?.email,
      address: user?.address,
      subscriptions: user?.subscriptions
        ? {
            id: user?.subscriptions.id,
            status: user?.subscriptions?.status,
          }
        : null,
    };

    await redisClient.set(`user-${user.id}`, JSON.stringify(own));

    return {
      user: own,
      access_token: token,
    };
  }
}
