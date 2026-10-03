import { Request, Response } from "express";
import { UserModel } from "../models/user.model";
import { AppError } from "../utils/AppError";
import { asyncHandler } from "../utils/asyncHandler";
import { created, success } from "../utils/apiResponse";

export const listUsers = asyncHandler(async (_req: Request, res: Response) => {
  const users = await UserModel.find().populate("role").sort({ createdAt: -1 });
  success(res, users);
});

export const getUser = asyncHandler(async (req: Request, res: Response) => {
  const user = await UserModel.findById(req.params.id).populate("role");
  if (!user) throw new AppError("User not found", 404);
  success(res, user);
});

export const createUser = asyncHandler(async (req: Request, res: Response) => {
  const exists = await UserModel.findOne({ email: req.body.email });
  if (exists) throw new AppError("Email already exists", 409);
  const user = await UserModel.create(req.body);
  const populated = await UserModel.findById(user._id).populate("role");
  created(res, populated);
});

export const updateUser = asyncHandler(async (req: Request, res: Response) => {
  delete req.body.password;
  const user = await UserModel.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true }).populate("role");
  if (!user) throw new AppError("User not found", 404);
  success(res, user, "Updated");
});

export const deleteUser = asyncHandler(async (req: Request, res: Response) => {
  const user = await UserModel.findByIdAndDelete(req.params.id);
  if (!user) throw new AppError("User not found", 404);
  success(res, null, "Deleted");
});
