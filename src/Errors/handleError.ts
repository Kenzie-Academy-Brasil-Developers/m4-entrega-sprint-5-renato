import { AppError } from "./AppError";
import { Response, Request, NextFunction } from "express";
import "express-async-errors";

const handleError = async (
  error: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (error instanceof AppError) {
    return res.status(error.statuscode).json({
      message: error.message,
    });
  }

  return res.status(500).json({
    message: error.message,
  });
};

export default handleError;
