import { compare } from "bcryptjs";
import { prisma } from "../../prisma";
import { sign } from "jsonwebtoken";

interface AuthServiceRequest {
  email: string;
  password: string;
}

export const AuthUserService = {
  async execute({ email, password }: AuthServiceRequest) {
    const user = await prisma.user.findFirst({
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
        expiresIn: "30d",
      }
    );

    return {
      id: user?.id,
      name: user?.name,
      email: user?.email,
      address: user?.address,
      token: token,
      subscription: user?.subscriptions
        ? {
            id: user?.subscriptions?.id,
            status: user?.subscriptions?.status,
          }
        : null,
    };
  },
};
