import { stripe } from "./stripe";
import { prisma } from "../prisma";

export async function saveSubscription(
  subscriptionId: string,
  customerId: string,
  createAction = false,
  deleteAction = false
) {
  const findUser = await prisma.user.findFirst({
    where: {
      strip_customer_id: customerId,
    },
    include: {
      subscriptions: true,
    },
  });

  const subscription = await stripe.subscriptions.retrieve(subscriptionId);

  const subscriptionData = {
    id: subscription.id,
    userId: findUser.id,
    status: subscription.status,
    priceId: subscription.items.data[0].price.id,
  };

  if (createAction) {
    console.log(subscriptionData);

    try {
      await prisma.subscription.create({
        data: subscriptionData,
      });
    } catch (error) {
      console.log("ERRO CREATE");
      console.log(error);
    }
  } else {
    // Se não estiver criando apenas atualizando as informações

    if (deleteAction) {
      await prisma.subscription.delete({
        where: {
          id: subscriptionId,
        },
      });

      return;
    }

    try {
      await prisma.subscription.update({
        where: {
          id: subscriptionId,
        },
        data: {
          status: subscription.status,
          priceId: subscription.items.data[0].price.id,
        },
      });
    } catch (error) {
      console.log("Erro update hook");
      console.log(error);
    }
  }
}
