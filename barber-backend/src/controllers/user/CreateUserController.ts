import { Request, Response } from "express";
import {
  CreateUserService,
  UserRequest,
} from "../../services/user/CreateUserService";

export class CreateUserController {
  async handle(request: Request, response: Response) {
    const { name, email, password } = request.body as UserRequest;

    const createUserService = new CreateUserService();

    const user = await createUserService.execute({
      name,
      email,
      password,
    });

    return response.json(user);
  }
}
