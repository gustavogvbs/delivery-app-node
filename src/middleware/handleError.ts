/* eslint-disable @typescript-eslint/no-unused-vars */
import { Request, Response, NextFunction } from "express";

import { AppError } from "@errors/AppErro";

const handleError = (
  err: Error,
  request: Request,
  response: Response,
  next: NextFunction,
) => {
  if (err instanceof AppError) {
    return response.status(err.statusCode).json({
      status: err.statusCode,
      message: err.message,
    });
  }
  return response.status(500).json({
    status: "error",
    message: `Internal server error - ${err}`,
  });
};

export { handleError };
