import { Request, Response } from "express";
import { UpdateUserService } from "../../services/user/update-user-service";

export const UpdateUserController = {
  handle: async (request: Request, response: Response) => {
    const { name, address } = request.body;
    const user_id = request.user_id;

    const user = await UpdateUserService.execute({ name, address, user_id });

    return response.status(201).json(user);
  },
};
