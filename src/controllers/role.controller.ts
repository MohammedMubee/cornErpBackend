import { RoleModel } from "../models/role.model";
import { createOne, deleteOne, getAll, getById, updateOne } from "./crudFactory";

const populate = "permissions.module";
export const listRoles = getAll(RoleModel, populate);
export const getRole = getById(RoleModel, populate);
export const createRole = createOne(RoleModel);
export const updateRole = updateOne(RoleModel);
export const deleteRole = deleteOne(RoleModel);
