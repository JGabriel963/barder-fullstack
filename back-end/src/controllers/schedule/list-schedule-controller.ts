import { Request, Response } from "express";
import { ListScheduleService } from "../../services/schedule/list-schedule-service";

export const ListScheduleController = {
  handle: async (request: Request, response: Response) => {
    const user_id = request.user_id;

    const schedules = await ListScheduleService.execute({
      user_id,
    });

    return response.json(schedules);
  },
};
