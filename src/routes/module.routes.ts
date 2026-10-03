import { Router } from "express";
import { createModule, deleteModule, getModule, listModules, updateModule } from "../controllers/module.controller";
import { authorize, protect } from "../middlewares/auth.middleware";
import { validate } from "../validators/common";
import { moduleCreateSchema, moduleUpdateSchema } from "../validators/module.validator";

const router = Router();
router.use(protect);
router.get("/", authorize("AUTH", "VIEW"), listModules);
router.get("/:id", authorize("AUTH", "VIEW"), getModule);
router.post("/", authorize("AUTH", "CREATE"), validate(moduleCreateSchema), createModule);
router.put("/:id", authorize("AUTH", "UPDATE"), validate(moduleUpdateSchema), updateModule);
router.delete("/:id", authorize("AUTH", "DELETE"), deleteModule);
export default router;
