import { Request, Response } from "express";
import { CreateHaircutService } from "../../services/haircut/create-haircut-service";

export const CreateHaircutController = {
  hanlde: async (request: Request, response: Response) => {
    const { name, price } = request.body;
    const user_id = request.user_id;

    const haircut = await CreateHaircutService.execute({
      name,
      price,
      user_id,
    });

    return response.status(201).json(haircut);
  },
};
