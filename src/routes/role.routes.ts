import { Router } from "express";
import { createRole, deleteRole, getRole, listRoles, updateRole } from "../controllers/role.controller";
import { authorize, protect } from "../middlewares/auth.middleware";
import { validate } from "../validators/common";
import { roleCreateSchema, roleUpdateSchema } from "../validators/role.validator";

const router = Router();
// router.use(protect);
router.get("/",  listRoles);
router.get("/:id", authorize("ROLES", "VIEW"), getRole);
router.post("/", validate(roleCreateSchema), createRole);
router.put("/:id", authorize("ROLES", "UPDATE"), validate(roleUpdateSchema), updateRole);
router.delete("/:id", authorize("ROLES", "DELETE"), deleteRole);
export default router;
