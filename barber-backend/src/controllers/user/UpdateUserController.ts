import { Request, Response } from "express";
import { UpdateUserService } from "../../services/user/UpdateUserService";

export class UpdateUserController {
  async handle(request: Request, response: Response) {
    const { user_id } = request;
    const { name, address } = request.body;

    const user = await new UpdateUserService().execute({
      user_id,
      name,
      address,
    });

    return response.status(201).json(user);
  }
}
