import { Router } from "express";
import { createUserController } from "../controllers/user/createUserController";
import { deleteUserController } from "../controllers/user/deleteUserController";
import { editUserController } from "../controllers/user/editUserController";
import { requestUsersController } from "../controllers/user/requestUsersController";
import { dataValidation } from "../middlewares/schemaValidationMiddleware";
import { verifyAdmMiddleware } from "../middlewares/users/verifyAdm";
import { verifyIdMiddleware } from "../middlewares/users/verifyIdMiddleware";
import { verifyUserMiddleware } from "../middlewares/users/verifyUserExists";
import { verifyToken } from "../middlewares/verifyTokenMiddleware";
import { userSerializer } from "../serializers/users/users.serializers";

const userRouter = Router();

userRouter.post(
  "",
  dataValidation(userSerializer),
  verifyUserMiddleware,
  createUserController
);

userRouter.get("", verifyToken, verifyAdmMiddleware, requestUsersController);

userRouter.patch("/:id", verifyToken, editUserController);

userRouter.delete(
  "/:id",
  verifyToken,
  verifyAdmMiddleware,
  verifyIdMiddleware,
  deleteUserController
);

export { userRouter };
