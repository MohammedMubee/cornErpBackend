import { z } from "zod";
import { objectIdSchema } from "./common";

const teamMemberSchema = z.object({
  user: objectIdSchema,
  role: objectIdSchema,
  designation: z.string().optional(),
  assignedBy: objectIdSchema.optional(),
  isLead: z.boolean().optional(),
  isActive: z.boolean().optional(),
});

export const projectCreateSchema = z.object({
  body: z.object({
    name: z.string().min(2),
    code: z.string().min(2),
    client: objectIdSchema,
    location: z.string().min(2),
    startDate: z.coerce.date(),
    endDate: z.coerce.date().optional(),
    budget: z.number().min(0).default(0),
    team: z.array(teamMemberSchema).default([]),
    status: z.enum(["Planning", "Active", "On Hold", "Completed", "Cancelled"]).optional(),
    description: z.string().optional(),
  }),
  params: z.object({}).optional(),
  query: z.object({}).optional(),
});

export const projectUpdateSchema = z.object({
  body: projectCreateSchema.shape.body.partial(),
  params: z.object({ id: objectIdSchema }),
  query: z.object({}).optional(),
});

export const teamAssignSchema = z.object({
  body: teamMemberSchema,
  params: z.object({ id: objectIdSchema }),
  query: z.object({}).optional(),
});
