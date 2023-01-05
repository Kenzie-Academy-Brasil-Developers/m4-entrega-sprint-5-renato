import { Router } from "express";
import { createPropertyController } from "../controllers/properties/createPropertyController";
import { listPropertiesController } from "../controllers/properties/listPropertiesController";
import { verifyAdmMiddleware } from "../middlewares/users/verifyAdm";
import { verifyToken } from "../middlewares/verifyTokenMiddleware";

const propertiesRouter = Router();

propertiesRouter.post(
  "",
  verifyToken,
  verifyAdmMiddleware,
  createPropertyController
);

propertiesRouter.get("", listPropertiesController);

export { propertiesRouter };
