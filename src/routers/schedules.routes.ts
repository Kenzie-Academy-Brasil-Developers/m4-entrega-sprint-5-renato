import { Router } from "express";
import { createScheduleController } from "../controllers/schedules/createScheduleController";
import { listSchedulesController } from "../controllers/schedules/listSchedulesController";
import { verifyAdmMiddleware } from "../middlewares/users/verifyAdm";
import { verifyToken } from "../middlewares/verifyTokenMiddleware";

const schedulesRouter = Router();

schedulesRouter.post("", verifyToken, createScheduleController);
schedulesRouter.get(
  "/properties/:id",
  verifyToken,
  verifyAdmMiddleware,
  listSchedulesController
);

export { schedulesRouter };
