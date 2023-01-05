import { Request, Response } from "express";
import { editUserService } from "../../services/users/editUserService";

const editUserController = async (req: Request, res: Response) => {
  const data = await editUserService(req.body, req.params.uuid);

  return res.status(200).json(data);
};

export { editUserController };
