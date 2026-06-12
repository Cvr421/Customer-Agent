import { Request, Response, NextFunction } from 'express';

export function errorHandler(err: any, req: Request, res: Response, next: NextFunction) {
  console.error("Unhandleable App Context Exception Stack:", err);
  
  const status = err.status || 500;
  const message = err.message || "An unhandled engine crash eventuated. Please contact infrastructure systems.";
  
  res.status(status).json({
    error: message,
    success: false
  });
}