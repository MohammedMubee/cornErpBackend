import { z } from "zod";
import { objectIdSchema } from "./common";

export const clientCreateSchema = z.object({
  body: z.object({
    clientCode: z.string().min(2),
    companyName: z.string().min(2),
    contactPerson: z.string().min(2),
    email: z.string().email().optional().or(z.literal("")),
    phone: z.string().min(6),
    alternatePhone: z.string().optional(),
    website: z.string().optional(),
    gstNumber: z.string().optional(),
    panNumber: z.string().optional(),
    addressLine1: z.string().min(2),
    addressLine2: z.string().optional(),
    city: z.string().min(2),
    state: z.string().min(2),
    country: z.string().default("India"),
    pincode: z.string().min(4),
    clientType: z.enum(["Builder", "Individual", "Government", "Corporate", "Contractor"]).default("Builder"),
    status: z.enum(["Active", "Inactive"]).optional(),
    remarks: z.string().optional(),
  }),
  params: z.object({}).optional(),
  query: z.object({}).optional(),
});

export const clientUpdateSchema = z.object({
  body: clientCreateSchema.shape.body.partial(),
  params: z.object({ id: objectIdSchema }),
  query: z.object({}).optional(),
});
