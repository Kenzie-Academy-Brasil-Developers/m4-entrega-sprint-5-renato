import { Router } from "express";
import { createCategorieController } from "../controllers/categories/createCategorieController";
import { listCategoriesController } from "../controllers/categories/listCategoriesController";
import { verifyAdmMiddleware } from "../middlewares/users/verifyAdm";
import { verifyToken } from "../middlewares/verifyTokenMiddleware";

const categoriesRouter = Router();

categoriesRouter.post(
  "",
  verifyToken,
  verifyAdmMiddleware,
  createCategorieController
);

categoriesRouter.get("", listCategoriesController);

export { categoriesRouter };
