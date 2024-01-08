import { Request, Response } from "express";
import { NewScheduleService } from "../../services/schedule/new-schedule-service";

export const NewScheduleController = {
  handle: async (request: Request, response: Response) => {
    const { customer, haircut_id } = request.body;
    const user_id = request.user_id;

    const schedule = await NewScheduleService.execute({
      customer,
      haircut_id,
      user_id,
    });

    return response.status(201).json(schedule);
  },
};
