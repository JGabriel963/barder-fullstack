import Stripe from "stripe";
import { prisma } from "../../prisma";

interface CreatePortalRequest {
  user_id: string;
}

export const CreatePortalService = {
  async execute({ user_id }: CreatePortalRequest) {
    const stripe = new Stripe(process.env.STRIPE_API_KEY, {
      apiVersion: "2023-10-16",
      appInfo: {
        name: "dev-spotify",
        version: "1",
      },
    });

    const findUser = await prisma.user.findFirst({
      where: {
        id: user_id,
      },
    });

    let sessionId = findUser.strip_customer_id;

    if (!sessionId) {
      console.log("NAO TEM ID");
      return { message: "User not found" };
    }

    const portalSession = await stripe.billingPortal.sessions.create({
      customer: sessionId,
      return_url: process.env.STRIPE_SUCCESS_URL,
    });

    return { sessionId: portalSession.url };
  },
};
