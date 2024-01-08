import { Request, Response } from "express";
import { CheckSubscriptionService } from "../../services/haircut/check-subscription-service";

export const CheckSubscriptionController = {
  handle: async (request: Request, response: Response) => {
    const user_id = request.user_id;

    const status = await CheckSubscriptionService.execute({ user_id });

    return response.json(status);
  },
};
