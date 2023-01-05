import { Request, Response } from "express";
import { requestUsersService } from "../../services/users/requestUsersService";

const requestUsersController = async (req: Request, res: Response) => {
  const users = await requestUsersService();

  return res.status(200).json(users);
};

export { requestUsersController };
