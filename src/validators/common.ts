import { NextFunction, Request, Response } from "express";
import { z, ZodSchema } from "zod";

export const objectIdSchema = z.string().regex(/^[0-9a-fA-F]{24}$/, "Invalid MongoDB ObjectId");

export const validate = (schema: ZodSchema) => (req: Request, res: Response, next: NextFunction) => {
  const result = schema.safeParse({ body: req.body, params: req.params, query: req.query });
  if (!result.success) {
    return res.status(400).json({ success: false, message: "Validation failed", errors: result.error.flatten() });
  }
  Object.assign(req, result.data);
  next();
};
