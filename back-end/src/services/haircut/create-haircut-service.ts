import { prisma } from "../../prisma";

interface HaircutRequest {
  user_id: string;
  name: string;
  price: string;
}

export const CreateHaircutService = {
  async execute({ user_id, name, price }: HaircutRequest) {
    if (!name || !price) {
      throw new Error("Error to register haircut");
    }

    // Verificar quantos modelos essse usuário já possue
    const myHaircuts = await prisma.haircut.count({ where: { user_id } });

    const user = await prisma.user.findFirst({
      where: { id: user_id },
      include: {
        subscriptions: true,
      },
    });

    // Validação premiun
    if (myHaircuts >= 3 && user?.subscriptions?.status !== "active") {
      throw new Error("Not authorized");
    }

    const haircut = await prisma.haircut.create({
      data: {
        name: name,
        price: price,
        user_id: user_id,
      },
    });

    return haircut;
  },
};
