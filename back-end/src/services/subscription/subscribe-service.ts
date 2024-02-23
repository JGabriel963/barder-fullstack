import { prisma } from "../../prisma";
import Stripe from "stripe";

interface SubscribeRequest {
  user_id: string;
}

export const SubscribeService = {
  async execute({ user_id }: SubscribeRequest) {
    const stripe = new Stripe(process.env.STRIPE_API_KEY, {
      apiVersion: "2023-10-16",
      appInfo: {
        name: "barberpro",
        version: "1",
      },
    });

    // Buscar o usuário e cadastrar ele no stripe caso não tenha cadastrado
    const findUser = await prisma.user.findFirst({
      where: {
        id: user_id,
      },
    });

    let customerId = findUser.strip_customer_id;

    if (!customerId) {
      // Caso não tenha, criamos como cliente lá no stripe
      const striperCustomer = await stripe.customers.create({
        email: findUser.email,
      });

      await prisma.user.update({
        where: {
          id: user_id,
        },
        data: {
          strip_customer_id: striperCustomer.id,
        },
      });

      customerId = striperCustomer.id;
    }

    // Inicializar o nosso checkout de pagamento
    const stripeCheckoutSession = await stripe.checkout.sessions.create({
      customer: customerId,
      payment_method_types: ["card"],
      billing_address_collection: "required",
      line_items: [{ price: process.env.STRIPE_PRICE, quantity: 1 }],
      mode: "subscription",
      allow_promotion_codes: true,
      success_url: process.env.STRIPE_SUCCESS_URL,
      cancel_url: process.env.STRIPE_CANCEL_URL,
    });

    return { sessionId: stripeCheckoutSession.id };
  },
};
