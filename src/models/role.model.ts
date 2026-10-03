import mongoose, { Document, Schema, Types } from "mongoose";
import { Permission, PERMISSIONS } from "../constants";

export interface IRolePermission {
  module: string;
  moduleCode: string;
  permissions: Permission[];
}

export interface IRole extends Document {
  name: string;
  code: string;
  description?: string;
  permissions: IRolePermission[];
  isSystem: boolean;
  isActive: boolean;
}

const rolePermissionSchema = new Schema<IRolePermission>(
  {
    module: { type:String, required: true },
    moduleCode: { type: String, required: true, uppercase: true, trim: true },
    permissions: [{ type: String, enum: PERMISSIONS, required: true }],
  },
  { _id: false }
);

const roleSchema = new Schema<IRole>(
  {
    name: { type: String, required: true, unique: true, trim: true },
    code: { type: String, required: true, unique: true, uppercase: true, trim: true },
    description: { type: String, trim: true },
    permissions: [rolePermissionSchema],
    isSystem: { type: Boolean, default: false },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

export const RoleModel = mongoose.model<IRole>("Role", roleSchema);
