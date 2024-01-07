import { Request, Response } from "express";
import { ListHaircutService } from "../../services/haircut/list-haircut-service";

export const ListHaircutController = {
  handle: async (request: Request, response: Response) => {
    const user_id = request.user_id;
    const status = request.query.status as string;

    const haircuts = await ListHaircutService.execute({
      user_id,
      status,
    });

    return response.json(haircuts);
  },
};
