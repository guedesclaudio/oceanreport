import { logger } from "../config";
import { invalidDataError } from "../erros";
import { NextFunction, Request, Response } from "express";
import httpStatus from "http-status";
import { ObjectSchema } from "joi";

export function validateBody<T>(schema: ObjectSchema<T>): ValidationMiddleware {
  return validate(schema, "body");
}

export function validateParams<T>(schema: ObjectSchema<T>): ValidationMiddleware {
  return validate(schema, "params");
}

function validate(schema: ObjectSchema, type: "body" | "params") {
  return (req: Request, res: Response, next: NextFunction) => {
    
    const { error } = schema.validate(req[type], {
      abortEarly: false,
    });
    
    if (!error) {
      next();
    } else {
      logger.error(`[MIDDLEWARE VALIDATE] Schema: ${schema}. Type: ${type}. Error:${JSON.stringify(error?.details)}.`);
      res.status(httpStatus.BAD_REQUEST).send(invalidDataError(error?.details?.map((error) => error?.message)));
    }
  };
}

type ValidationMiddleware = (req: Request, res: Response, next: NextFunction)=> void;
