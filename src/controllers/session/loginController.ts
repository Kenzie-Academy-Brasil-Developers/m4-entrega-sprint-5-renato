import { Request, Response } from "express";
import { userLoginService } from "../../services/sessions/loginService";

const userLoginController = async (req: Request, res: Response) => {
  const data = await userLoginService(req.body);

  return res.status(200).json(data);
};

export { userLoginController };
