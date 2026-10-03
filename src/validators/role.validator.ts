import { z } from "zod";
import { PERMISSIONS } from "../constants";
import { objectIdSchema } from "./common";

const permissionSchema = z.object({
  module: objectIdSchema,
  moduleCode: z.string().min(2),
  permissions: z.array(z.enum(PERMISSIONS)).default([]),
});

export const roleCreateSchema = z.object({
  body: z.object({
    name: z.string().min(2),
    code: z.string().min(2),
    description: z.string().optional(),
    permissions: z.array(permissionSchema).default([]),
    isActive: z.boolean().optional(),
  }),
  params: z.object({}).optional(),
  query: z.object({}).optional(),
});

export const roleUpdateSchema = z.object({
  body: roleCreateSchema.shape.body.partial(),
  params: z.object({ id: objectIdSchema }),
  query: z.object({}).optional(),
});
