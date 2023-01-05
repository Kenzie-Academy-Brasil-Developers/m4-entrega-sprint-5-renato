import { Request, Response } from "express";
import { deleteUserService } from "../../services/users/deleteUserService";

const deleteUserController = async (req: Request, res: Response) => {
  const deleted = await deleteUserService(req.params.uuid);

  return res.status(204).json(deleted);
};

export { deleteUserController };
