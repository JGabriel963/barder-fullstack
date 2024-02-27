import { Request, Response } from "express";
import { CreatePortalService } from "../../services/subscription/create-portal-service";

export const CreatePortalController = {
  async handle(request: Request, response: Response) {
    const user_id = request.user_id;

    const portal = await CreatePortalService.execute({
      user_id,
    });

    return response.json(portal);
  },
};
