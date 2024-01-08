import { Request, Response } from "express";
import { CountHaircutService } from "../../services/haircut/count-haircut-service";

export const CountHaircutController = {
  handle: async (request: Request, response: Response) => {
    const user_id = request.user_id;

    const count = await CountHaircutService.exectue({
      user_id,
    });

    return response.json(count);
  },
};
