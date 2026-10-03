import { Types } from "mongoose";

export type AuthUser = {
  id: string;
  roleId?: string;
  roleName?: string;
  permissions?: string[];
};

declare global {
  namespace Express {
    interface Request {
      user?: AuthUser;
    }
  }
}

export type ObjectId = Types.ObjectId;
