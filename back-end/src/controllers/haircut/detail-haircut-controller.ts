import { Request, Response } from "express";
import { DetailHaircutService } from "../../services/haircut/detail-haircut-service";

export const DetailHaricutController = {
  handle: async (request: Request, response: Response) => {
    const haircut_id = request.query.haircut_id as string;

    const haircut = await DetailHaircutService.execute({
      haircut_id,
    });

    return response.json(haircut);
  },
};
