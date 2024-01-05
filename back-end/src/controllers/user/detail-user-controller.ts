import { Request, Response } from "express";
import { UserDetailService } from "../../services/user/detail-user-service";

export const DetailUserController = {
  handle: async (request: Request, response: Response) => {
    const user_id = request.user_id;

    console.log(user_id);

    const user = await UserDetailService.execute();

    return response.json(user);
  },
};
