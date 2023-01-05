import { Request, Response } from "express";
import { listSchedules } from "../../services/schedules/listScheduleService";

const listSchedulesController = async (req: Request, res: Response) => {
  const data = await listSchedules(req.params.id);

  return res.status(200).json(data);
};

export { listSchedulesController };
