import { Request, Response } from "express";
import { FinishScheduleService } from "../../services/schedule/finish-schedule-service";

export const FinishScheduleController = {
  handle: async (request: Request, response: Response) => {
    const user_id = request.user_id;
    const schedule_id = request.query.schedule_id as string;

    const schedule = await FinishScheduleService.execute({
      user_id,
      schedule_id,
    });

    return response.json(schedule);
  },
};
