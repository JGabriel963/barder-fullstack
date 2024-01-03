import { prisma } from "../../prisma";
import { hash } from "bcryptjs";

interface UserRequest {
  name: string;
  email: string;
  password: string;
}

export const CreateUserService = {
  async execute({ name, email, password }: UserRequest) {
    if (!email) {
      throw new Error("Email incorrect");
    }

    const userAlreadyExists = await prisma.user.findFirst({
      where: { email: email },
    });

    if (userAlreadyExists) {
      throw new Error("User already exists");
    }

    const hashPassword = await hash(password, 8);

    const user = prisma.user.create({
      data: {
        name: name,
        email: name,
        password: hashPassword,
      },
    });

    return user;
  },
};
