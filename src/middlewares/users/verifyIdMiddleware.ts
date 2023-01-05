import { Request, Response, NextFunction } from "express";
import AppDataSource from "../../data-source";
import { User } from "../../entities/user.entity";
import { AppError } from "../../Errors/AppError";

const verifyIdMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const userId = req.params.id;
  const userRep = AppDataSource.getRepository(User);

  const user = await userRep.findOneBy({
    id: userId,
  });

  if (!user) {
    throw new AppError("insert a valid id", 400);
  }

  return next();
};

export { verifyIdMiddleware };
