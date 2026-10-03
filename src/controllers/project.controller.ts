import { Request, Response } from "express";
import { ProjectModel } from "../models/project.model";
import { AppError } from "../utils/AppError";
import { asyncHandler } from "../utils/asyncHandler";
import { success } from "../utils/apiResponse";
import { createOne, deleteOne, getAll, getById, updateOne } from "./crudFactory";

const populate = ["client", "team.user", "team.role"];
export const listProjects = getAll(ProjectModel, populate);
export const getProject = getById(ProjectModel, populate);
export const createProject = createOne(ProjectModel);
export const updateProject = updateOne(ProjectModel);
export const deleteProject = deleteOne(ProjectModel);

export const assignTeamMember = asyncHandler(async (req: Request, res: Response) => {
  const project = await ProjectModel.findById(req.params.id);
  if (!project) throw new AppError("Project not found", 404);

  const exists = project.team.some((member) => String(member.user) === req.body.user && member.isActive);
  if (exists) throw new AppError("User already assigned to this project", 409);

  project.team.push({ ...req.body, assignedBy: req.body.assignedBy ?? req.user?.id });
  await project.save();
  const populated = await ProjectModel.findById(project._id).populate(populate);
  success(res, populated, "Team member assigned");
});

export const removeTeamMember = asyncHandler(async (req: Request, res: Response) => {
  const project = await ProjectModel.findById(req.params.id);
  if (!project) throw new AppError("Project not found", 404);

  project.team.forEach((member) => {
    if (String(member.user) === req.params.userId) {
      member.isActive = false;
    }
  });
  await project.save();
  success(res, project, "Team member removed");
});
