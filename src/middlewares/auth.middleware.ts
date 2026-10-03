import { NextFunction, Request, Response } from "express";
import { RoleModel } from "../models/role.model";
import { UserModel } from "../models/user.model";
import { AppError } from "../utils/AppError";
import { asyncHandler } from "../utils/asyncHandler";
import { verifyAccessToken } from "../utils/jwt";

export const protect = asyncHandler(async (req: Request, _res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;
  if (!authHeader?.startsWith("Bearer ")) throw new AppError("Authentication token missing", 401);

  const token = authHeader.split(" ")[1];
  const decoded = verifyAccessToken(token);

  const user = await UserModel.findById(decoded.id).populate("role");
  if (!user || user.status !== "Active") throw new AppError("User not active or not found", 401);

  const role = await RoleModel.findById(user.role);
  const permissions = role?.permissions.flatMap((p) => p.permissions.map((permission) => `${p.moduleCode}:${permission}`)) ?? [];

  req.user = { id: user.id, roleId: String(user.role), roleName: role?.name, permissions };
  next();
});

export const authorize = (moduleCode: string, permission: string) =>
  asyncHandler(async (req: Request, _res: Response, next: NextFunction) => {
    if (!req.user) {
      const authHeader = req.headers.authorization;
      if (authHeader?.startsWith("Bearer ")) {
        try {
          const token = authHeader.split(" ")[1];
          const decoded = verifyAccessToken(token);
          const user = await UserModel.findById(decoded.id).populate("role");
          if (user && user.status === "Active") {
            const role = await RoleModel.findById(user.role);
            const permissions = role?.permissions.flatMap((p) => p.permissions.map((perm) => `${p.moduleCode}:${perm}`)) ?? [];
            req.user = { id: user.id, roleId: String(user.role), roleName: role?.name, permissions };
          }
        } catch {
          // Token invalid or expired
        }
      }
    }

    if (!req.user) throw new AppError("Unauthorized: Authentication required", 401);
    const roleName = (req.user.roleName || "").toLowerCase();
    const isAdmin = roleName.includes("admin");
    const key = `${moduleCode}:${permission}`;
    if (!isAdmin && !req.user.permissions?.includes(key)) throw new AppError("Forbidden: permission denied", 403);
    next();
  });
