import { Request, Response } from "express";
import {
  AuthUserRequest,
  AuthUserService,
} from "../../services/user/AuthUserService";

export class AuthUserController {
  async handle(request: Request, response: Response) {
    const { email, password } = request.body as AuthUserRequest;

    const authUserService = new AuthUserService();

    const session = await authUserService.execute({
      email,
      password,
    });

    return response.json(session);
  }
}
