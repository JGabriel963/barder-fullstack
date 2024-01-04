import { Request, Response } from "express";
import { AuthUserService } from "../../services/user/auth-user-service";

export const AuthUserController = {
  handle: async (request: Request, response: Response) => {
    const { email, password } = request.body;

    const session = await AuthUserService.execute({
      email,
      password,
    });

    return response.json(session);
  },
};
