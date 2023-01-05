import { Request, Response } from "express";
import { createPropertyService } from "../../services/properties/createPropertyService";

const createPropertyController = async (req: Request, res: Response) => {
  const property = await createPropertyService(req.body, req.body.address);

  return res.status(201).json(property);
};

export { createPropertyController };
