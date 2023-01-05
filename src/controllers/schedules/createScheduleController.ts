import { Request, Response } from "express";
import { createScheduleService } from "../../services/schedules/createScheduleService";

const createScheduleController = async (req: Request, res: Response) => {
  const data = await createScheduleService(req.body, req.headers.authorization);

  return res.status(201).json(data);
};

export { createScheduleController };
