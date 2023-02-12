import { Request, Response, NextFunction } from 'express';
import { AppError } from '../utils/AppError';

const errorHandler = (
  err: AppError,
  _: Request,
  res: Response,
  _2: NextFunction
) => {
  const statusCode = err.statusCode || 500;
  res
    .status(statusCode)
    .json({ status: 'error', statusCode, message: err.message });
};

export default errorHandler;
