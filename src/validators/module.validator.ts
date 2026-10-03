import { z } from "zod";
import { objectIdSchema } from "./common";

export const moduleCreateSchema = z.object({
  body: z.object({
    name: z.string().min(2),
    code: z.string().min(2),
    path: z.string().min(1),
    icon: z.string().optional(),
    order: z.number().optional(),
    isActive: z.boolean().optional(),
  }),
  params: z.object({}).optional(),
  query: z.object({}).optional(),
});

export const moduleUpdateSchema = z.object({
  body: moduleCreateSchema.shape.body.partial(),
  params: z.object({ id: objectIdSchema }),
  query: z.object({}).optional(),
});
