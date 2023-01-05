import { Request, Response } from "express";
import { createCategorieService } from "../../services/categories/createCategorieService";

const createCategorieController = async (req: Request, res: Response) => {
  const category = await createCategorieService(req.body);

  return res.status(201).json(category);
};

export { createCategorieController };
