import { Request, Response } from "express";
import { Model } from "mongoose";
import { AppError } from "../utils/AppError";
import { asyncHandler } from "../utils/asyncHandler";
import { created, success } from "../utils/apiResponse";

type PopulateConfig = string | string[];

export const getAll = <T>(ModelRef: Model<T>, populate?: PopulateConfig) =>
  asyncHandler(async (req: Request, res: Response) => {
    const page = Math.max(Number(req.query.page ?? 1), 1);
    const limit = Math.min(Math.max(Number(req.query.limit ?? 20), 1), 100);
    const skip = (page - 1) * limit;

    let query = ModelRef.find().sort({ createdAt: -1 }).skip(skip).limit(limit);
    if (populate) query = query.populate(populate as any);

    const [items, total] = await Promise.all([query, ModelRef.countDocuments()]);
    success(res, { items, pagination: { page, limit, total, pages: Math.ceil(total / limit) } });
  });

export const getById = <T>(ModelRef: Model<T>, populate?: PopulateConfig) =>
  asyncHandler(async (req: Request, res: Response) => {
    let query = ModelRef.findById(req.params.id);
    if (populate) query = query.populate(populate as any);
    const item = await query;
    if (!item) throw new AppError("Record not found", 404);
    success(res, item);
  });

export const createOne = <T>(ModelRef: Model<T>) =>
  asyncHandler(async (req: Request, res: Response) => {
    const item = await ModelRef.create(req.body);
    created(res, item);
  });

export const updateOne = <T>(ModelRef: Model<T>) =>
  asyncHandler(async (req: Request, res: Response) => {
    const item = await ModelRef.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!item) throw new AppError("Record not found", 404);
    success(res, item, "Updated");
  });

export const deleteOne = <T>(ModelRef: Model<T>) =>
  asyncHandler(async (req: Request, res: Response) => {
    const item = await ModelRef.findByIdAndDelete(req.params.id);
    if (!item) throw new AppError("Record not found", 404);
    success(res, null, "Deleted");
  });
