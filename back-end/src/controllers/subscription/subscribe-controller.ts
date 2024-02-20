import { Request, Response } from "express";
import { SubscribeService } from "../../services/subscription/subscribe-service";

export const SubscribeController = {
  hanlde: async (request: Request, response: Response) => {
    const user_id = request.user_id;

    const subscribe = await SubscribeService.execute({ user_id });

    return response.json(subscribe);
  },
};
