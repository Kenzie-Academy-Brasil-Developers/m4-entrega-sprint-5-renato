import { Router } from "express";
import { userLoginController } from "../controllers/session/loginController";
import { dataValidation } from "../middlewares/schemaValidationMiddleware";
import { loginSerializer } from "../serializers/sessions/userLoginSerializer";

const sessionRouter = Router();

sessionRouter.post("", dataValidation(loginSerializer), userLoginController);

export { sessionRouter };
