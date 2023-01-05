import { Request, Response } from "express";
import { createUserService } from "../../services/users/createUserService";

const createUserController = async (req: Request, res: Response) => {
  const user = await createUserService(req.body);

  return res.status(201).json(user);
};

export { createUserController };
