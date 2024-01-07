import { Request, Response } from "express";
import { UpdateHaircutService } from "../../services/haircut/update-haircut-service";

export const UpdateHaircutController = {
  handle: async (request: Request, response: Response) => {
    const user_id = request.user_id;
    const { name, price, status, haircut_id } = request.body;

    const haircut = await UpdateHaircutService.execute({
      user_id,
      name,
      price,
      status,
      haircut_id,
    });

    return response.json(haircut);
  },
};
