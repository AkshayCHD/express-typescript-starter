import { NextFunction, Request, Response } from "express";
import { UnauthorizedError } from "express-jwt";
// import Log from "../middlewares/Log";
import Locals from "../providers/Locals";
import APIError from "./APIError";
import ValidationError from "./ValidationError";

class Handler {
  /**
   * Show undermaintenance page incase of errors
   */
  public static errorHandler(
    err: Error | ValidationError | APIError,
    req: Request,
    res: Response
  ): any {
    if (
      err instanceof ValidationError ||
      err instanceof APIError ||
      err instanceof UnauthorizedError
    ) {
      return res.status(err.status).json({ error: err.message });
    }
    return res.status(500).json({
      error: err.message,
    });
  }
}

export default Handler;
