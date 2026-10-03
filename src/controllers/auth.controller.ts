import { Request, Response } from "express";
import { RoleModel } from "../models/role.model";
import { UserModel } from "../models/user.model";
import { AppError } from "../utils/AppError";
import { asyncHandler } from "../utils/asyncHandler";
import { created, success } from "../utils/apiResponse";
import { signAccessToken, signRefreshToken } from "../utils/jwt";

const tokenResponse = (user: any) => ({
  user: {
    id: user.id,
    name: user.name,
    email: user.email,
    phone: user.phone,
    role: user.role,
    targetUser: user.targetUser,
    status: user.status,
  },
  accessToken: signAccessToken({ id: user.id, roleId: String(user.role?._id ?? user.role) }),
  refreshToken: signRefreshToken({ id: user.id, roleId: String(user.role?._id ?? user.role) }),
});

export const register = asyncHandler(async (req: Request, res: Response) => {
  const role = await RoleModel.findById(req.body.role);
  if (!role) throw new AppError("Role not found", 404);

  const exists = await UserModel.findOne({ email: req.body.email });
  if (exists) throw new AppError("Email already registered", 409);

  const user = await UserModel.create(req.body);
  const populated = await UserModel.findById(user._id).populate("role");
  created(res, tokenResponse(populated), "User registered");
});

export const login = asyncHandler(async (req: Request, res: Response) => {
  const user = await UserModel.findOne({ email: req.body.email }).select("+password").populate("role");
  if (!user || !(await user.comparePassword(req.body.password))) throw new AppError("Invalid email or password", 401);
  if (user.status !== "Active") throw new AppError("User account is inactive", 403);
  success(res, tokenResponse(user), "Login successful");
});

export const me = asyncHandler(async (req: Request, res: Response) => {
  const user = await UserModel.findById(req.user?.id).populate("role");
  success(res, user, "Profile fetched");
});

export const quickLogin = asyncHandler(async (req: Request, res: Response) => {
  const requestedRoleCode = String(req.body.role || req.query.role || "ADMIN").toUpperCase().replace(/\s+/g, "_");

  // Role profiles configuration
  const roleConfigs: Record<string, { name: string; code: string; email: string; targetUser: string; modules: string[] }> = {
    ADMIN: {
      name: "Super Admin",
      code: "ADMIN",
      email: "admin@constructionerp.com",
      targetUser: "Builder",
      modules: ["AUTH", "USERS", "ROLES", "PROJECTS", "BOQ", "MATERIALS", "MATERIAL_REQUEST", "PURCHASE_ORDER", "INVENTORY", "DAILY_REPORT", "LABOUR", "BILLING"],
    },
    PROJECT_MANAGER: {
      name: "Project Manager",
      code: "PROJECT_MANAGER",
      email: "pm@constructionerp.com",
      targetUser: "Project Manager",
      modules: ["PROJECTS", "BOQ", "MATERIAL_REQUEST", "DAILY_REPORT", "LABOUR"],
    },
    SITE_ENGINEER: {
      name: "Site Engineer",
      code: "SITE_ENGINEER",
      email: "site@constructionerp.com",
      targetUser: "Site Engineer",
      modules: ["PROJECTS", "MATERIAL_REQUEST", "DAILY_REPORT", "LABOUR"],
    },
    STORE_MANAGER: {
      name: "Store Manager",
      code: "STORE_MANAGER",
      email: "store@constructionerp.com",
      targetUser: "Store Manager",
      modules: ["MATERIALS", "MATERIAL_REQUEST", "PURCHASE_ORDER", "INVENTORY"],
    },
    ACCOUNTANT: {
      name: "Accountant",
      code: "ACCOUNTANT",
      email: "accountant@constructionerp.com",
      targetUser: "Accountant",
      modules: ["PURCHASE_ORDER", "BILLING"],
    },
  };

  const selectedConfig = roleConfigs[requestedRoleCode] || roleConfigs.ADMIN;

  // Find or create role
  let role = await RoleModel.findOne({ code: selectedConfig.code });
  if (!role) {
    const permissions = selectedConfig.modules.map((modCode) => ({
      module: modCode,
      moduleCode: modCode,
      permissions: ["VIEW", "CREATE", "UPDATE", "DELETE", "APPROVE"],
    }));

    role = await RoleModel.create({
      name: selectedConfig.name,
      code: selectedConfig.code,
      description: `${selectedConfig.name} Role Profile`,
      permissions: permissions as any,
      isSystem: true,
      isActive: true,
    });
  }

  // Find or create user
  let user = await UserModel.findOne({ email: selectedConfig.email }).populate("role");
  if (!user) {
    user = await UserModel.create({
      name: selectedConfig.name,
      email: selectedConfig.email,
      phone: "9876543210",
      password: "Admin@123",
      role: role._id,
      targetUser: selectedConfig.targetUser,
      status: "Active",
    });
    user = await UserModel.findById(user._id).populate("role");
  }

  if (!user) throw new AppError("Failed to initiate user session", 500);
  success(res, tokenResponse(user), `Logged in as ${selectedConfig.name}`);
});
