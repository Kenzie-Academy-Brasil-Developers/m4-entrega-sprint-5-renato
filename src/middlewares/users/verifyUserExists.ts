import { Request, Response, NextFunction } from "express";
import AppDataSource from "../../data-source";
import { User } from "../../entities/user.entity";
import { AppError } from "../../Errors/AppError";

const verifyUserMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const userRep = AppDataSource.getRepository(User);

  const foundUser = await userRep.findOneBy({
    email: req.body.email,
  });

  if (foundUser) {
    throw new AppError("User already exists!", 400);
  }

  return next();
};

export { verifyUserMiddleware };
