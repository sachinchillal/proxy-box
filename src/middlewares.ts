import { NextFunction, Request, Response } from "express";

export const loggingMiddleware = (req: Request, res: Response, next: NextFunction) => {
  // console.log(`Request: ${req.method} ${req.protocol}://${req.get('host')}${req.originalUrl}`);
  res.on('finish', () => {
    console.log(`${res.statusCode} ${req.method} ${req.protocol}://${req.get('host')}${req.originalUrl}`);
    // console.log(`Response: ${res.statusCode} ${res.statusMessage}`);
  });
  next();
};
