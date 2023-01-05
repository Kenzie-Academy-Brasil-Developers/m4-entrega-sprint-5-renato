import { Request, Response, NextFunction } from "express";
import AppDataSource from "../../data-source";
import { User } from "../../entities/user.entity";
import jwt from "jsonwebtoken";

const verifyAdmMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const userRep = AppDataSource.getRepository(User);

  let token = req.headers.authorization;

  token = token?.split(" ")[1] as string;

  try {
    const { email } = jwt.decode(token) as {
      email: string;
    };

    let userEmail = email;

    const user = await userRep.findOneBy({
      email: userEmail,
    });

    if (!user?.isAdm) {
      throw new Error("missing admin authorizations");
    }

    return next();
  } catch (error: any) {
    return res.status(403).json({
      message: error.message,
    });
  }
};

export { verifyAdmMiddleware };
