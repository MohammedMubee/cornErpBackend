import { ModuleModel } from "../models/module.model";
import { createOne, deleteOne, getAll, getById, updateOne } from "./crudFactory";

export const listModules = getAll(ModuleModel);
export const getModule = getById(ModuleModel);
export const createModule = createOne(ModuleModel);
export const updateModule = updateOne(ModuleModel);
export const deleteModule = deleteOne(ModuleModel);
