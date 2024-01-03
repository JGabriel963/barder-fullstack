import { Request, Response } from "express";
import { CreateUserService } from "../../services/user/create-user-service";

export const CreateUserController = {
  handle: async (req: Request, res: Response) => {
    const { name, email, password } = req.body;

    const user = await CreateUserService.execute({
      name,
      email,
      password,
    });

    return res.json(user);
  },
};
