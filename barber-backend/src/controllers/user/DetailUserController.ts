import { Request, Response } from "express";
import { UserDetailService } from "../../services/user/DetailUserService";

export class DetailUserController {
  async handle(request: Request, response: Response) {
    const { user_id } = request;

    const detailUser = await new UserDetailService().execute(user_id);

    return response.json(detailUser);
  }
}
