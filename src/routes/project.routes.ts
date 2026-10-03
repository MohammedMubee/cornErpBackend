import { Router } from "express";
import { assignTeamMember, createProject, deleteProject, getProject, listProjects, removeTeamMember, updateProject } from "../controllers/project.controller";
import { authorize, protect } from "../middlewares/auth.middleware";
import { validate } from "../validators/common";
import { projectCreateSchema, projectUpdateSchema, teamAssignSchema } from "../validators/project.validator";

const router = Router();
// router.use(protect);
router.get("/", listProjects);
router.get("/:id", authorize("PROJECTS", "VIEW"), getProject);
router.post("/", createProject);
router.put("/:id", authorize("PROJECTS", "UPDATE"), validate(projectUpdateSchema), updateProject);
router.delete("/:id", authorize("PROJECTS", "DELETE"), deleteProject);
router.post("/:id/team", authorize("PROJECTS", "UPDATE"), validate(teamAssignSchema), assignTeamMember);
router.delete("/:id/team/:userId", authorize("PROJECTS", "UPDATE"), removeTeamMember);
export default router;
